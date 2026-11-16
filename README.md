<p align='center'>
<img src='https://raw.githubusercontent.com/takere/.github/main/docs/images/logo/logo.png' alt="logo" />
</p>

<div align="center">

<h1>Takere - Landing Page</h1>
<p>Public website of the Takere project and its Research Lab.</p>

<a href="CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/code%20of-conduct-ff69b4.svg" alt="Code of Conduct" /></a>
<a href="SECURITY.md"><img src="https://img.shields.io/badge/security-policy-orange.svg" alt="Security Policy" /></a>
</div>

---

This repository contains the source code of [takere.com.br](https://www.takere.com.br), the bilingual (Portuguese and English) landing page of the Takere project and its Research Lab. It is built with Next.js (App Router) and exported as a static site hosted on GitHub Pages.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Routes](#routes)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Internationalization](#internationalization)
- [Editing Content](#editing-content)
- [Styling & Mobile Layout](#styling--mobile-layout)
- [Build & Deployment](#build--deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🌟 Overview

The site is a **fully static, bilingual website** that:

- Presents the Takere product and the Takere Research Lab
- Lists research lines, team members, publications, a photo gallery and contact information
- Serves Portuguese at unprefixed URLs (`/team`) and English under `/en` (`/en/team`)
- Generates SEO metadata, Open Graph images, `sitemap.xml` and `robots.txt` at build time
- Is deployed automatically to GitHub Pages on every push to `main`

## 🧰 Tech Stack

- **[Next.js 15](https://nextjs.org/)** (App Router, static export)
- **[React 19](https://react.dev/)** + **TypeScript**
- **[Tailwind CSS 4](https://tailwindcss.com/)**
- **[HeroUI 3](https://www.heroui.com/)** and **[React Aria](https://react-spectrum.adobe.com/react-aria/)** components
- **ESLint** (`eslint-config-next`)
- **GitHub Actions** + **GitHub Pages**

## 📁 Repository Structure

```
takere-landing-page/
├── app/
│   ├── [lang]/                  # Single route tree for both languages (pt, en)
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home page
│   │   ├── research/
│   │   ├── team/
│   │   ├── publications/
│   │   ├── gallery/
│   │   ├── contact/
│   │   └── policy/
│   ├── og/[image]/              # Open Graph images (/og/pt.png, /og/en.png)
│   ├── global-not-found.tsx     # 404 page
│   ├── globals.css              # Tailwind setup, theme and mobile scale unit
│   ├── sitemap.ts
│   └── robots.ts
├── components/                  # Top bar, footer, gallery, partners, stats...
├── data/                        # Structured content (team, publications, gallery...)
├── i18n/                        # Locale config, route helpers and dictionaries
├── lib/                         # Metadata, OG image rendering, helpers
├── public/                      # Static assets (images, CNAME, .nojekyll)
├── scripts/                     # Post-build scripts
├── middleware.ts                # Dev-only locale routing
└── .github/workflows/           # CI: build, deploy and release
```

## 🧭 Routes

| Portuguese | English | Content |
| --- | --- | --- |
| `/` | `/en` | Home page (Takere product) |
| `/research` | `/en/research` | Research Lab — research lines |
| `/team` | `/en/team` | Coordinators, members and former members |
| `/publications` | `/en/publications` | Publications by year |
| `/gallery` | `/en/gallery` | Photo gallery (with lightbox) |
| `/contact` | `/en/contact` | Contacts and map |
| `/policy` | `/en/policy` | Privacy policy |

## ✅ Prerequisites

- **Node.js** 22.9 or higher
- **Yarn** 1.22 (`npm install -g yarn`)

### Verify Installation

```bash
node --version
yarn --version
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/takere/takere-landingpage-frontend.git
   cd takere-landingpage-frontend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **(Optional) Configure the port**:
   ```bash
   cp .env.example .env
   ```
   Edit `PORT` in `.env` (default: `3000`). It applies to both `yarn dev` and `yarn start`.

4. **Start the development server**:
   ```bash
   yarn dev
   ```
   The site will be available at http://localhost:3000.

> [!CAUTION]
> **⚠️ Important:** Never commit `.env` files. They are ignored by Git.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start the development server with hot reload |
| `yarn build` | Build the static export into `out/` |
| `yarn preview` | Serve `out/` locally, as GitHub Pages does |
| `yarn lint` | Run ESLint |

### Previewing the static export

`yarn build` produces a plain static site in `out/`. To preview it as GitHub Pages serves it:

```bash
yarn build
yarn preview
```

> [!NOTE]
> `yarn start` (`next start`) does not serve a static export; use `yarn preview` instead.

## 🌐 Internationalization

- Supported languages are declared in `locales` in [`i18n/config.ts`](i18n/config.ts). Portuguese (`pt`) is the default locale and has **no URL prefix**.
- All interface texts live in the dictionaries [`i18n/dictionaries/pt.tsx`](i18n/dictionaries/pt.tsx) and [`i18n/dictionaries/en.tsx`](i18n/dictionaries/en.tsx). Pages contain no hardcoded text.
- The `en` dictionary is typed from the `pt` one, so a missing key is a **compile error**.
- Use the `href(lang, path)` helper from `i18n/config.ts` to build links: `href("pt", "/team")` → `/team`, `href("en", "/team")` → `/en/team`.

### How unprefixed Portuguese URLs work

- **In development**, [`middleware.ts`](middleware.ts) rewrites `/team` to `/pt/team` internally and redirects `/pt/...` to `/...`.
- **In production** (static export, no middleware), [`scripts/flatten-default-locale.mjs`](scripts/flatten-default-locale.mjs) runs after `next build` and moves the Portuguese pages to the site root (`pt.html` → `index.html`, `pt/team.html` → `team.html`).

### Adding a language

1. Add it to `locales` in `i18n/config.ts`
2. Create `i18n/dictionaries/<lang>.tsx`
3. Add the new key to every `Localized` field in `data/`

## ✏️ Editing Content

Structured content lives in [`data/`](data/). Edit these files to add members, photos, publications and so on:

| File | Content |
|------|---------|
| `data/home.ts` | Home page content |
| `data/research.ts` | Research lines |
| `data/team.ts` | Coordinators, members and former members |
| `data/publications.ts` | Publications |
| `data/gallery.ts` | Gallery photos |
| `data/partners.ts` | Partner institutions |
| `data/contact.ts` | Contact information |
| `data/stats.ts` | Statistics shown on the site |

Images go under [`public/img/`](public/img/) (`team/`, `gallery/`, `partners/`, `research/`, `home/`, `brand/`, `icons/`).

> [!TIP]
> Values that differ per language use the `Localized` type, e.g. `{ pt: "Equipe", en: "Team" }`.

## 🎨 Styling & Mobile Layout

- Styles are written with **Tailwind CSS 4**; the theme and custom utilities are defined in [`app/globals.css`](app/globals.css).
- Below **760px**, the site reproduces the original 320px-wide mobile layout scaled to the screen width, using the `--u` unit (`100vw / 320`). Tailwind spacing is tied to `--u`, and `text-u-N` sets a font size of `N` scaled units.
- Use the `mobile:` and `desktop:` variants for breakpoint-specific styles.
- Entrance animations use the `data-reveal` attribute (`up`, `left`, `right`), enabled by `components/RevealObserver.tsx`, and respect `prefers-reduced-motion`.

> [!NOTE]
> In Server Components, import HeroUI parts from `@heroui/react/<component>` (named parts) rather than from the package root.

## 📦 Build & Deployment

Deployment is fully automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). On every push to `main`:

1. **Build** — installs dependencies, runs `yarn build` and the tests (if a `test` script exists)
2. **Deploy** — publishes `out/` to GitHub Pages (custom domain set by [`CNAME`](CNAME))
3. **Release** — if the build and tests succeed, bumps the patch version in `package.json`, pushes a `vX.Y.Z` tag and creates a GitHub Release with auto-generated notes

> [!NOTE]
> The version bump commit is pushed by `github-actions[bot]` with `[skip ci]`. Run `git pull` before your next push.

## 🐛 Troubleshooting

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: Stop the conflicting process or change `PORT` in `.env`.

### Dev server breaks after running a build
`next build` and `next dev` share the `.next/` folder by default, so building while the dev server is running corrupts it.

**Solution**: Restart `yarn dev`, or build into a separate folder:
```bash
NEXT_DIST_DIR=.next-export yarn build
```

### Missing translation key
```
Property '<key>' is missing in type ...
```
**Solution**: Add the key to `i18n/dictionaries/en.tsx` (or any other locale) with the same shape as in `pt.tsx`.

## 📝 License

This project is part of the Takere ecosystem. See the main project repository for license information.

## 🤝 Contributing

We welcome contributions to the Takere landing page! Whether you're fixing bugs, updating content, improving documentation, or suggesting enhancements, your help is appreciated.

### Quick Start

1. Read our [Contributing Guidelines](CONTRIBUTING.md)
2. Review our [Code of Conduct](CODE_OF_CONDUCT.md)
3. Fork the repository and create a feature branch
4. Make your changes following the guidelines
5. Run `yarn lint` and `yarn build`
6. Submit a pull request

### Key Contribution Areas

- **Content** - Team members, publications, gallery photos, research lines
- **Translations** - Keep Portuguese and English texts in sync
- **Accessibility & performance** - Improve semantics, contrast and loading
- **Documentation** - Improve guides, add examples, fix typos
- **Bug fixes** - Help identify and fix issues

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to understand the expectations for participating in this community.
