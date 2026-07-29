import type { MouseEvent, MouseEventHandler, ReactNode } from "react";
import { useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type SharedProps = {
  children: ReactNode;
  className?: string;
  "data-cursor"?: string;
};

type RippleAnchorProps = SharedProps &
  Omit<HTMLMotionProps<"a">, "onClick" | "children" | "className"> & {
    href: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type RippleNativeButtonProps = SharedProps &
  Omit<HTMLMotionProps<"button">, "onClick" | "children" | "className"> & {
    href?: undefined;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

type RippleButtonProps = RippleAnchorProps | RippleNativeButtonProps;

export function RippleButton({
  ...componentProps
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ripple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    setRipples((current) => [...current.slice(-2), ripple]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== ripple.id));
    }, 520);
  };

  const renderContent = (children: ReactNode) => (
    <>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="pointer-events-none absolute h-12 w-12 rounded-full bg-white/30 blur-sm"
          style={{ left: ripple.x - 24, top: ripple.y - 24 }}
          initial={{ opacity: 0.45, scale: 0 }}
          animate={{ opacity: 0, scale: 4.8 }}
          transition={{ duration: 0.52, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (componentProps.href) {
    const {
      children,
      className = "",
      href,
      "data-cursor": dataCursor,
      onClick,
      ...anchorProps
    } = componentProps as RippleAnchorProps;

    return (
      <motion.a
        {...anchorProps}
        data-cursor={dataCursor ?? "button"}
        href={href}
        className={`relative isolate overflow-hidden ${className}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={(event) => {
          createRipple(event);
          onClick?.(event);
        }}
      >
        {renderContent(children)}
      </motion.a>
    );
  }

  const {
    children,
    className = "",
    "data-cursor": dataCursor,
    onClick,
    disabled,
    ...buttonProps
  } = componentProps as RippleNativeButtonProps;

  return (
    <motion.button
      {...buttonProps}
      data-cursor={dataCursor ?? "button"}
      disabled={disabled}
      className={`relative isolate overflow-hidden ${className}`}
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={(event) => {
        createRipple(event);
        onClick?.(event);
      }}
    >
      {renderContent(children)}
    </motion.button>
  );
}
