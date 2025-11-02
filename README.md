# MSA Landing (Meet Safe Always)

**Tagline:** _Meet who’s really behind the profile._  
_Subline:_ _Identity verified. Plans shared. Safety built in._

This is a lightweight **React + Vite + Tailwind** landing page, prepped for deployment on **Vercel**.

---

## Quick Start (Local)

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel (Recommended)

1. Push this folder to a new GitHub repo, e.g. `msa-landing` under **github.com/adam-timko-code**.
2. Go to Vercel → New Project → Import `adam-timko-code/msa-landing`.
3. Framework Preset: **Vite** (auto-detected).  
4. Build command: `vite build` (auto)  
   Output directory: `dist` (auto)
5. Deploy. Your site will be live on a `.vercel.app` domain. You can later add a custom domain.

**Vercel account:** `atimkoat-2981` (FYI you shared this).

## Notes

- Minimal UI components (`Button`, `Card`, `Input`) are included to avoid external UI system setup.
- Customize the hero, colors, and copy in `src/App.jsx`.
- Tailwind is configured in `tailwind.config.js` and `src/index.css`.
