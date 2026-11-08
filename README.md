# HUZA technical documentation

The technical documentation for HUZA, built by Team Athena at AkiraChix. It covers the system architecture, the backend, the apps and the project reference.

## Run it on your computer

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve -a 127.0.0.1:8001
```

Open http://127.0.0.1:8001.

## Publish

Open a pull request into `main`. When it is merged, the workflow in `.github/workflows/docs.yml` builds the site and publishes it with GitHub Pages.

Live site: https://akirachix.github.io/athena-technical-documentation/
