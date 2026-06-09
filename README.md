# privacycoders.org

Base Jekyll website scaffold for GitHub Pages.

## Project structure

- `index.html`: Homepage with Jekyll front matter
- `404.html`: Custom 404 page
- `_layouts/default.html`: Shared Jekyll layout
- `_config.yml`: Jekyll site configuration
- `Gemfile`: Jekyll and plugin dependencies
- `assets/css/style.css`: Site styles
- `assets/js/main.js`: Small client-side script
- `.github/workflows/pages.yml`: GitHub Actions Jekyll deployment workflow

## Local preview

Install dependencies and run Jekyll:

```bash
bundle install
bundle exec jekyll serve
```

Then visit http://localhost:4000.

## Deploy

1. Push to the `main` branch.
2. In GitHub repository settings, set Pages source to **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` builds and deploys automatically.

If this repository is for a user/org site (like `username.github.io`), keep `CNAME` in the root for custom domain routing.
