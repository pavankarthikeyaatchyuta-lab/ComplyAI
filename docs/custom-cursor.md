# Phase 8 Custom Cursor

This document describes the custom animated cursor implemented for ComplyAI.

The cursor is designed to make the UI memorable while reinforcing the product themes:

- compliance
- verification
- AI workflow
- security

## Component

```text
frontend/src/components/cursor/ComplyCursor.tsx
```

The cursor is mounted globally from:

```text
frontend/src/app/App.tsx
```

## Cursor Modes

The cursor reads `data-cursor` attributes from hovered elements.

Supported modes:

```text
default
button
upload
report
agent
hidden
```

## Interaction Rules

### Default

Shows:

- outer glowing ring
- inner blue/emerald pulse
- verification check icon
- soft blue particle trail

### Buttons

When hovering buttons or links:

- cursor expands
- glow increases
- label changes to `Open`

### Upload Zone

When hovering upload surfaces:

- cursor expands
- icon changes to upload
- blue glow intensifies

### Report

When hovering report sections:

- cursor changes to document icon
- ring becomes document-like blue/white

### Agent Cards

When hovering agent/workflow cards:

- cursor glows emerald
- icon changes to security/verification

## Performance Decisions

The cursor avoids unnecessary work by:

- enabling only on fine pointer devices
- disabling itself when `prefers-reduced-motion` is enabled
- keeping the trail short
- sampling particles every few pointer events
- using Framer Motion motion values and springs for smooth movement
- avoiding layout reads inside the animation loop

## Reusable Pattern

Any element can opt into a cursor mode:

```tsx
<section data-cursor="report">...</section>
<div data-cursor="upload">...</div>
<article data-cursor="agent">...</article>
<button data-cursor="button">...</button>
```

If no attribute is present, interactive elements automatically use the button mode and the rest of the page uses the default verification cursor.

## UX Decision

The cursor is intentionally brand-specific but restrained. It adds polish and memorability without interfering with compliance work or reducing readability.
