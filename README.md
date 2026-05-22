# Bioinformatics Portfolio and CV Layout

[![Deploy to GitHub Pages](https://github.com/bhagesh-h/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/bhagesh-h/portfolio/actions/workflows/deploy.yml)

A highly polished, interactive portfolio and responsive CV system built with React, TypeScript, and Tailwind CSS. The app features customizable visual sections, live filtering, a glowing background aesthetic, and a print-optimized, clean CSS layout for high-fidelity resume generation and exporting.

## Dual Yaml Config Structure

To ensure that the digital experience matches your exact presentation goals, the application uses two separate YAML configuration files:

1. **Portfolio Configuration (public/metadata.yaml)**
   Controls the global look, intro sections, full professional timeline, web projects, full interactive links, and interactive visual elements shown on the live website.

2. **Print CV Configuration (public/resume.yaml)**
   Controls the high-fidelity professional CV section and the hidden, system-native print template. Any detail omitted or left empty in this configuration will strictly not appear in the generated or exported PDF file.

## Features

- **Interactive Dynamic Layouts**
  Fluid responsive design optimized across mobile, tablet, and desktop viewports.

- **Developer Aesthetic**
  A customized design utilizing monospace accent values, sophisticated negative space, and modern typography hierarchy.

- **Print CV Optimization**
  A dedicated layout mode that restructures components specifically for printer engines, standard A4 margins, and text readability.

## Local Development Instructions

Follow these steps to run the application locally on your machine:

1. **Install Dependencies**
   Install all the packages defined in package.json:
   ```bash
   npm install
   ```

2. **Run in Development Mode**
   Start the local development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 inside your web browser.

3. **Production Compilation**
   To bundle the static application ready for production systems:
   ```bash
   npm run build
   ```
   The static outputs will be written directly into the dist directory.
