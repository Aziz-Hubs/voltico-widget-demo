# Voltico Widget Demo

Single-page Next.js demo showing the OpenCX chat widget themed to match Voltico's brand guidelines.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS 4
- React 19
- `@opencx/widget-react`

## What's branded

- Color tokens (Ghost White, Bright Indigo, Space Indigo, Carbon Black)
- Inter (free substitute for Stack Sans)
- 28px container radius, 22px trigger radius, 24px input radius
- Voltico V mark on the trigger (inline SVG, no broken images)
- Premium app-icon trigger: gradient + specular shine + ambient pulse
- Bubble corners with brand-aligned 4px "tails"

## Local development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

```bash
vercel --prod
```

## Notes

The widget uses an OpenCX demo token. Branding on this page is for illustration only — Voltico is referenced here as a design case study.
