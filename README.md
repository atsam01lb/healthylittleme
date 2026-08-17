# Healthy Little Me — Website

A single-page, fully animated website for **Healthy Little Me** (Nisrine Hamad, RD) — a telehealth pediatric nutrition and eating disorder practice.

Plain HTML/CSS/JS. No build step, no framework, no dependencies to install — just static files.

## Project structure

```
healthy-little-me/
├── index.html        All page content and section markup
├── css/
│   └── style.css      Brand colors, layout, and all animations/transitions
├── js/
│   └── main.js         Scroll reveal, sticky header, mobile nav, testimonial slider
└── README.md
```

## Running it locally

No install needed. Either:

- Double-click `index.html` to open it in a browser, or
- Serve it (recommended, avoids any local file-permission quirks):
  ```bash
  cd healthy-little-me
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

## Pushing to GitHub

```bash
cd healthy-little-me
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin <your-empty-repo-URL>
git push -u origin main
```

## Turning on GitHub Pages

In your repo on GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / root**. The site will go live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## What's placeholder right now (swap these before launch)

1. **Photos** — the hero, About, and Why-Us sections currently use soft illustrated circles/icons instead of real photography (per your instruction to leave images as placeholders). Swap in real photos of Nisrine and/or family imagery whenever ready — the placeholder blocks are clearly marked with a small tag in the corner (e.g. "Photo placeholder — swap anytime") so they're easy to find in `index.html`.
2. **Logo** — the header/footer currently use a simple heart icon + text wordmark styled in your brand colors, since the logo file didn't come through as an attachable image in our chat. Drop your actual logo file into the project (e.g. `images/logo.png` or `.svg`) and swap the `.brand-mark` SVG block in `index.html` (appears twice — header and footer) for an `<img>` tag pointing to it.
3. **Testimonials** — the "What Our Happy Clients Said" section has 3 placeholder quotes, clearly labeled. Replace the `<p class="quote">` and name/role text in the `#testimonials` section of `index.html` with real client feedback whenever you have it.
4. **Colors** — brand colors in `css/style.css` (`:root` section at the top) were estimated visually from your logo. If you have exact hex codes from the original design file, update the `--sage`, `--coral`, `--mustard`, and `--blush` variables there — the whole site will update automatically.

## Notes

- Fonts (Google Fonts: Poppins, Quicksand, Dancing Script) and icons (Font Awesome via cdnjs) load from public CDNs — completely standard, no setup required, and cached across most sites so they typically load instantly.
- Animations respect `prefers-reduced-motion` for accessibility.
- Fully responsive: tested down to mobile widths, with a slide-in mobile nav menu.
- Booking buttons link out to your Fay Nutrition (insurance) and Venmo (cash) links exactly as provided, opening in a new tab.
