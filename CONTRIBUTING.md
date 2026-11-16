# Contributing to Takere Landing Page

Thank you for your interest in contributing to the Takere Landing Page! This document provides guidelines and instructions for contributing to this repository.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Content Guidelines](#content-guidelines)
- [Internationalization Guidelines](#internationalization-guidelines)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Documentation](#documentation)
- [Testing](#testing)

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Affected page(s) and language** (e.g. `/en/team`)
- **Environment details** (browser and version, OS, device / screen width)
- **Relevant logs** or console errors
- **Screenshots** if applicable

> [!IMPORTANT]
> Security vulnerabilities must **not** be reported as public issues. Follow the [Security Policy](SECURITY.md) instead.

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear use case** - Why is this enhancement needed?
- **Proposed solution** - How would you implement it?
- **Alternative solutions** - What other approaches did you consider?
- **Impact assessment** - How does this affect existing pages, SEO or the mobile layout?

### Updating Content

Most content changes (team members, publications, gallery photos, research lines) only require editing files in `data/` and adding images to `public/img/`. See [Content Guidelines](#content-guidelines).

### Adding New Pages

Before adding a new page:

1. **Discuss in an issue** - Describe the page and its purpose
2. **Support every language** - Each page must exist in Portuguese and English
3. **Follow the guidelines** - See [Development Guidelines](#development-guidelines)
4. **Update documentation** - Add the route to the README's Routes section

### Improving Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or clarifying existing documentation
- Adding examples or use cases
- Improving README structure
- Adding troubleshooting guides

## 🚀 Getting Started

### Prerequisites

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/takere-landingpage-frontend.git
   cd takere-landingpage-frontend
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/takere/takere-landingpage-frontend.git
   ```
4. **Install Node.js** 22.9 or higher and **Yarn** 1.22 (see README)

### Setting Up Development Environment

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Start the development server**:
   ```bash
   yarn dev
   ```

4. **Make your changes** following the guidelines below

5. **Test your changes** thoroughly (see [Testing](#testing)):
   ```bash
   yarn lint
   yarn build
   ```

## 📝 Development Guidelines

### General Principles

1. **No hardcoded text** - Interface texts belong in `i18n/dictionaries/`, content in `data/`
2. **Static first** - The site is a static export; avoid features that need a server at runtime (API routes, middleware-only behavior, image optimization)
3. **Server Components by default** - Only add `"use client"` when interactivity requires it
4. **Clear naming** - Use descriptive, consistent names for files, components and data
5. **Test thoroughly** - Verify changes in both languages and on desktop and mobile widths

### Project Structure

Maintain the existing structure:

```
takere-landing-page/
├── app/
│   └── [lang]/          # Pages (one route tree for all languages)
├── components/          # Shared components
├── data/                # Structured content
├── i18n/                # Locale config and dictionaries
├── lib/                 # Metadata and helpers
├── public/img/          # Images
└── scripts/             # Post-build scripts
```

### File Organization

- **Pages**: `app/[lang]/<route>/page.tsx`, containing the page metadata and JSX
- **Components**: One component per file in `components/`, named in PascalCase
- **Content**: One file per content type in `data/`
- **Images**: Grouped by section under `public/img/` and resized before committing

### Styling

1. **Tailwind CSS** - Use Tailwind utilities; theme tokens and custom utilities live in `app/globals.css`
2. **Mobile layout** - Below 760px, sizes scale with the `--u` unit (1/320 of the screen width). Write mobile sizes as the values from a 320px-wide layout
3. **Breakpoints** - Use the `mobile:` and `desktop:` variants
4. **Accessibility** - Keep semantic HTML, alt texts, keyboard navigation and `prefers-reduced-motion` support
5. **HeroUI in Server Components** - Import named parts from `@heroui/react/<component>`

### Example Page

```tsx
// app/[lang]/example/page.tsx
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/example">) {
  return pageMetadata((await params).lang as Lang, "example");
}

export default async function ExamplePage({ params }: PageProps<"/[lang]/example">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang);
  return <h1>{t.example.title}</h1>;
}
```

A new page also needs its SEO texts under `seo.pages` in the dictionaries and an entry in `ROUTES` (`lib/metadata.ts`), which feeds the sitemap.

## 🧩 Content Guidelines

When adding or updating content in `data/`:

1. **Localize every text** - Use the `Localized` type (`{ pt: "...", en: "..." }`) for anything shown to visitors
2. **Optimize images** - Resize and compress images before adding them to `public/img/`
3. **Consistent naming** - Use lowercase, hyphen-separated image file names
4. **Alt texts** - Provide meaningful descriptions for images
5. **Personal data** - Only publish information that the people involved agreed to share

## 🌐 Internationalization Guidelines

1. **Add keys to every dictionary** - `en.tsx` is typed from `pt.tsx`, so a missing key fails the build
2. **Use `href(lang, path)`** - Never build localized links by hand
3. **Check both languages** - Review the Portuguese (`/...`) and English (`/en/...`) versions of every changed page
4. **Adding a language** - Add it to `locales` in `i18n/config.ts`, create its dictionary and add the key to every `Localized` field in `data/`

## 🔄 Pull Request Process

1. **Update documentation** - Update README.md and other relevant docs
2. **Test thoroughly** - Ensure lint and build pass and pages render correctly
3. **Follow commit guidelines** - Use conventional commit messages
4. **Create pull request** with:
   - Clear title describing the change
   - Detailed description of what and why
   - Reference to related issues (if any)
   - Screenshots (desktop and mobile) for visual changes
5. **Address review feedback** - Respond to and implement requested changes
6. **Keep PR focused** - One feature/fix per PR

> [!NOTE]
> Every merge into `main` is deployed to production and creates a new release automatically. Make sure the PR is ready to go live.

### Pull Request Checklist

- [ ] Code follows project style and guidelines
- [ ] `yarn lint` passes
- [ ] `yarn build` passes
- [ ] Changes checked in Portuguese and English
- [ ] Changes checked on desktop and mobile widths
- [ ] Documentation has been updated
- [ ] Commit messages follow conventions
- [ ] No sensitive information (passwords, keys, `.env` files) committed

## 📝 Commit Message Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/) format. A **context** in parentheses is required between the type and the colon:

```
<type>(<context>): <subject>
```

### Types

- **feat**: New feature (new page, component, or capability)
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates

### Context

Use a short scope that identifies the area of the change (for example `team`, `gallery`, `i18n`, `readme`, `ci`). Context is required on every commit.

### Examples

```
feat(publications): add 2026 publications
```

```
fix(gallery): close lightbox on Escape key
```

```
docs(readme): add troubleshooting section for port conflicts
```

## 📚 Documentation

### What to Document

1. **New pages** - Add them to the README's Routes section
2. **New content files** - Add them to the README's Editing Content section
3. **Configuration changes** - Document new environment variables in `.env.example` and the README
4. **Breaking changes** - Clearly mark and explain in commit and PR
5. **Non-obvious code** - Add comments explaining *why*, not *what*

### Documentation Standards

- Use clear, concise language
- Write documentation in English
- Include code examples where appropriate
- Add links to external documentation for technologies used
- Keep README.md organized and up-to-date
- Use proper Markdown formatting

## 🧪 Testing

### Automated Checks

The CI pipeline builds the site on every push to `main` and runs `yarn test` when a `test` script exists. Run the same checks locally before submitting a PR:

```bash
yarn lint
yarn build
```

### Manual Testing

1. **Development server**:
   ```bash
   yarn dev
   ```

2. **Static export** - Preview the production output, since it differs from the dev server (no middleware):
   ```bash
   yarn build
   yarn preview
   ```

3. **Both languages** - Check the Portuguese and English versions of every changed page

4. **Responsive layout** - Check widths below and above 760px

5. **Navigation** - Verify links, the language switcher and the 404 page

### Testing Checklist

- [ ] Lint passes without errors
- [ ] Build passes without errors
- [ ] Pages render correctly in Portuguese and English
- [ ] Layout works on mobile and desktop
- [ ] No console errors in the browser
- [ ] Links and language switcher work
- [ ] Images load and have alt texts

## ❓ Questions?

If you have questions about contributing:

1. Check existing [Issues](https://github.com/takere/takere-landingpage-frontend/issues)
2. Create a new issue with your question
3. Reach out to maintainers

## 🙏 Thank You!

Your contributions help make the Takere Landing Page better for everyone. We appreciate your time and effort!

---

**Happy Contributing! 🚀**
