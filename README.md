# Energy Quest - ICSE Class 7 Physics Adventure ⚡

A gamified quiz adventure for ICSE Class 7 Physics - Chapter: Energy.

## Features

- 30 questions across 7 themed worlds
- MCQ, True/False, Fill in Blank, Assertion-Reason, Scenario, HOTS, Application questions
- Timer-based gameplay with scoring and XP system
- Streak bonuses, speed bonuses, and power-ups
- Achievement badges and level progression
- Tab switch detection and violation system
- Fullscreen mode enforcement
- Sound effects (Web Audio API)
- Review mode and printable certificate
- Fully responsive (mobile, tablet, desktop)

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- shadcn/ui style components
- React Icons

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
Connect the repo or drag `dist/` to Netlify.

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

## Project Structure

```
src/
  components/    # React components
  hooks/         # Custom hooks
  data/          # Questions, worlds, achievements
  types/         # TypeScript types
  utils/         # Utility functions
```
