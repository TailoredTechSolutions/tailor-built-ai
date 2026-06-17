# TTS React Integration — SnapScrollHero + MagicBento

## Files in this package

| File | Destination in repo |
|---|---|
| `SnapScrollHero.tsx` | `src/components/tts/SnapScrollHero.tsx` |
| `MagicBento.tsx` | `src/components/tts/MagicBento.tsx` |
| `fluidSimScript.ts` | `src/components/tts/fluidSimScript.ts` |
| `index.tsx` | `src/routes/index.tsx` (**replaces existing**) |

## Hero images

Copy the 7 JPEG files from the `tts-deploy/` folder into:
```
public/hero/
```

The images must be at these exact paths (referenced in `SnapScrollHero.tsx`):
```
public/hero/Gemini_Generated_Image_whv98mwhv98mwhv9.jpeg
public/hero/Gemini_Generated_Image_5eb8nq5eb8nq5eb8.jpeg
public/hero/Gemini_Generated_Image_m862yym862yym862.jpeg
public/hero/Gemini_Generated_Image_kvdguxkvdguxkvdg.jpeg
public/hero/Gemini_Generated_Image_9q6xun9q6xun9q6x.jpeg
public/hero/Gemini_Generated_Image_31m5uu31m5uu31m5.jpeg
public/hero/Gemini_Generated_Image_wmwb6uwmwb6uwmwb.jpeg
```

## No new dependencies needed

Everything uses packages already in `package.json`:
- `react` / `react-dom` (hooks)
- `three` / `@types/three` (already installed — not used directly but confirms WebGL is fine)
- No GSAP, no Framer Motion, no OGL required

## Steps (GitHub Desktop)

1. Open GitHub Desktop → `TailoredTechSolutions/tailor-built-ai`
2. Create a new branch: `feat/snap-scroll-hero`
3. Copy the 4 `.tsx`/`.ts` files to their destinations above
4. Create `public/hero/` folder and copy the 7 JPEGs into it
5. Review the diff — you should see:
   - 3 new files in `src/components/tts/`
   - 1 modified file: `src/routes/index.tsx`
   - 7 new images in `public/hero/`
6. Commit: `feat(hero): snap-scroll cinematic hero + MagicBento services`
7. Push branch → open Pull Request on GitHub
8. Lovable will pick up the PR automatically and preview it

## What changed in index.tsx

Removed: `<Hero />`, `<SilkRibbon />`, `<Marquee />`, `<Testimonials />`  
Added: `<SnapScrollHero />`, `<MagicBento />`  
Kept: Nav, Projects, Stack, Founders, Frameworks, Markets, Contact, Footer

## TypeScript note

`SnapScrollHero.tsx` uses `as React.CSSProperties` on a style object with CSS custom
properties (`--glow-x` etc). This is standard practice for CSS vars in React — TS
accepts it cleanly. No extra type declarations needed.

## Lovable-specific

Lovable reads from whatever branch is set as the sync branch (usually `main`).
If you're working on `feat/snap-scroll-hero`, merge it to `main` (or your sync
branch) and Lovable will rebuild automatically.
