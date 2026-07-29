# Phase 9 Micro Animations

This document describes the premium micro-interactions implemented for ComplyAI.

The animation layer is intentionally subtle and professional. It adds polish without making the compliance workflow feel playful or distracting.

## Reusable Components

### `RippleButton`

Path:

```text
frontend/src/components/motion/RippleButton.tsx
```

Provides:

- click ripple
- subtle tap scale
- hover elevation
- works as button or anchor
- defaults to `data-cursor="button"`

### `TiltCard`

Path:

```text
frontend/src/components/motion/TiltCard.tsx
```

Provides:

- pointer-based card tilt
- smooth spring easing
- hover elevation
- optional cursor mode

### `SkeletonBlock`

Path:

```text
frontend/src/components/motion/SkeletonBlock.tsx
```

Provides:

- shimmer loading placeholder
- lightweight CSS/Framer animation

### `SuccessConfetti`

Path:

```text
frontend/src/components/motion/SuccessConfetti.tsx
```

Provides:

- short success burst
- small particle count
- used only after successful upload

## Implemented Interactions

### Button Ripple

Implemented with `RippleButton` on:

- upload start
- reset
- browse files
- report actions
- workflow navigation actions

### Hover Elevation

Implemented through:

- `RippleButton` hover lift
- `TiltCard` hover lift
- existing Framer Motion card hover states

### Card Tilt

Implemented with `TiltCard` on:

- report metric cards
- developer metric cards

### Upload Animation

Implemented through:

- animated drag state
- upload progress ring
- OCR indicator pulse
- success confetti

### Progress Bars

Implemented through:

- animated workflow progress bars
- shimmer highlight over filled progress
- API timing bars in Developer Mode

### Skeleton Loading

Implemented in the upload preview document placeholder with shimmer skeleton blocks.

### Animated Checklist

Implemented in the report checklist:

- staggered row entrance
- animated check icons
- subtle row hover movement

### Success Confetti

Implemented in upload success state.

### Review Pulse

Implemented on the running workflow stage card.

### Timeline Animation

Implemented in:

- workflow dashboard timeline
- developer execution timeline

## Performance Decisions

The animation system is optimized by:

- keeping animations transform/opacity based
- avoiding expensive layout reads except pointer-local tilt math
- limiting confetti particle count
- limiting cursor trail count
- using Framer Motion motion values and springs
- avoiding global animation loops for cards
- keeping skeletons small and local

## Design Principle

Every animation should clarify state or reward completion. Nothing should make ComplyAI feel like a chatbot or a toy.
