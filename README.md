# Dev Portfolio Generator

Dev Portfolio Generator is a small Node.js CLI tool that creates a static developer portfolio website from a JSON config file.

You describe your profile in a `portfolio.json` file (or via an interactive prompt), and the tool generates a styled `index.html` + `style.css` that you can deploy anywhere.

---

## Features

- Interactive **init** command to collect your details.
- Generates `portfolio.json` automatically from your answers.
- **Build** command turns `portfolio.json` into:
  - `dist/index.html` – your portfolio page.
  - `dist/style.css` – default styling.
- Simple HTML/CSS output you can customize further.

---

## Prerequisites

- [Node.js](https://nodejs.org/) installed (any recent LTS version).  
- Basic command‑line usage.

---

## Installation

Clone the repository and install dependencies:


---

## Usage

### 1. Create or replace `portfolio.json`

You have **two options**:

#### Option A: Use the interactive CLI (recommended)

Run:




Then answer the prompts:

- Your name, title, location, bio
- GitHub, LinkedIn, email
- Skills (comma separated)
- Number of projects, then for each:
  - Name
  - Description
  - Tech stack (comma separated)
  - Link (GitHub or live URL)

When you finish, the tool will create a **valid `portfolio.json`** in the project root, replacing any existing one.

#### Option B: Replace `portfolio.json` manually

1. Open `portfolio.json` in the project root.
2. Replace its contents with your own data, keeping valid JSON syntax:


3. Save the file. Make sure all keys and strings are double‑quoted and there are **no trailing commas**.

---

### 2. Generate the portfolio

After `portfolio.json` is ready (via init or manual edit), run:


This will create the `dist` folder:


Open `dist/index.html` in your browser to see your generated portfolio.

---

## Project Structure

.
├── bin/
│   └── dev-portfolio.js      # CLI entry (init + build commands)
├── src/
│   └── build.js              # Reads portfolio.json and generates HTML/CSS
├── templates/
│   ├── index.html            # Portfolio HTML template with {{placeholders}}
│   └── style.css             # Default styling for generated site
├── portfolio.json            # Your data (created by `npm run init` or edited manually)
├── dist/
│   ├── index.html            # Generated portfolio page
│   └── style.css             # Copied/processed CSS for the generated page
└── package.json              # Project config, scripts, and CLI metadata

---

## Customization

- Edit `templates/index.html` to change the layout or add sections.
- Edit `templates/style.css` to change colors, fonts, or layout.
- After making template changes, rerun:


to regenerate `dist/index.html` and `dist/style.css`.

---

## License

You can choose a license such as MIT for open use and modification.
