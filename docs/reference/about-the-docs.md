# About these docs

These docs are written in Markdown and built with MkDocs Material.

## 1. Edit the docs

1. Open the docs repository.
2. Edit or add a file inside the `docs` folder.
3. Add new pages to the `nav` list in `mkdocs.yml`.

## 2. Preview on your computer

```bash
source .venv/bin/activate
mkdocs serve -a 127.0.0.1:8001
```

Open http://127.0.0.1:8001. The page refreshes when you save a file.

## 3. Publish

1. Open a pull request into `main`. The workflow in `.github/workflows` builds the site to check it.
2. When the pull request is merged, the same workflow builds the site and publishes it with GitHub Pages.
3. In the repository, open **Settings**, then **Pages** and set the source to **GitHub Actions**. This is done once.
4. The site appears at `https://akirachix.github.io/athena-technical-documentation/`.

## 4. Writing rules

- Keep each page about one thing and put it in the section it belongs to.
- Use plain words and short sentences.
- Write about what is built today.
- Never paste secrets, tokens or real `.env` values.
