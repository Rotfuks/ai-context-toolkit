#!/usr/bin/env node

import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs-extra';
import { resolve, extname, basename, dirname, join } from 'path';
import chalk from 'chalk';
import { mdToPdf } from 'md-to-pdf';

const program = new Command();

// Get package version
const packagePath = join(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
const version = packageJson.version;



const giantSwarmCSS = `
/* Giant Swarm Professional Report Styling */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  /* Official Giant Swarm Brand Colors - Primary Palette */
  --gs-blue: #002645;           /* Giant Swarm Blue - backgrounds, headlines, logo type */
  --gs-vivid-blue: #009fff;     /* Vivid Blue - technical objects, hyperlinks */
  --gs-orange: #e86d00;         /* Giant Swarm Orange - minimal touches, familiarity */
  --gs-green: #43dc67;          /* UFO Green - wildlife, greenery, success indicators */
  
  /* Official Giant Swarm Brand Colors - Secondary Palette */
  --gs-black: #000d1a;          /* Giant Swarm Black - darker backgrounds, depth */
  --gs-electric-blue: #5b6c79;  /* Electric Blue - body text on light backgrounds */
  --gs-shadow-blue: #6f8a9f;    /* Shadow Blue - pre-headlines, lighter text */
  --gs-white: #f0f7f9;          /* Giant Swarm White - background contrast */
  --gs-pure-white: #ffffff;     /* Pure white */
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #5b6c79; /* Body text color aus Style Guide */
  max-width: 210mm;
  margin: 0 auto;
  padding: 15mm 19mm; /* Style Guide Margins: 10mm oben/unten, 14mm seitlich */
  font-size: 10pt; /* Body text - 10pt aus Style Guide */
  background: var(--gs-pure-white);
  font-weight: 400;
  /* A4 Format: 210mm × 297mm - Two Column Layout */
  /* Content area: 182mm width (210mm - 2×14mm) */
  /* Two columns: 86mm + 10mm gutter + 86mm = 182mm */
}

/* Giant Swarm Report Header Styling */
.gs-report-header {
  text-align: center;
  margin-bottom: 3em;
  padding-bottom: 2em;
  border-bottom: 2px solid var(--gs-white);
  page-break-after: always;
}

/* Giant Swarm Logo in Header */
.gs-logo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
  padding: 1em 0;
  border-bottom: 1px solid var(--gs-white);
}

.gs-logo {
  height: 40px;
  width: auto;
}

.gs-page-info {
  font-size: 0.8em;
  color: var(--gs-shadow-blue);
  text-align: right;
}

/* A4 Page Setup - Style Guide konform */
@page {
  size: A4;
  margin: 15mm 14mm; /* Platz für Header/Footer, 14mm seitlich */
}

.gs-report-title {
  font-size: 36pt; /* Cover page headline - 36pt bold aus Style Guide */
  font-weight: bold;
  color: #002645; /* Headlines color aus Style Guide */
  margin-bottom: 0.5em;
  letter-spacing: -0.025em;
}

.gs-report-subtitle {
  font-size: 12pt; /* Body headline - 12pt aus Style Guide */
  color: #5b6c79;
  font-weight: 400;
  margin-bottom: 1em;
}

.gs-report-meta {
  font-size: 6pt; /* Mouse type headline - 6pt aus Style Guide */
  color: #5b6c79;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  margin-top: 2em;
  margin-bottom: 0.75em;
  color: var(--gs-blue);
  line-height: 1.3;
  page-break-after: avoid;
}

h1 {
  font-size: 18pt; /* Moderate Größe für H1 */
  font-weight: bold;
  border-bottom: 2px solid #002645; /* Dezenenter Border in Giant Swarm Blue */
  padding-top: 3em; /* Mehr Abstand von oben - abgehobener */
  padding-bottom: 0.6em; /* Mehr Abstand zum Border */
  margin-bottom: 2.5em; /* Mehr Abstand nach unten */
  margin-top: 0;
  color: #002645; /* Headlines color aus Style Guide */
  letter-spacing: -0.025em;
  page-break-before: always; /* Neue Seite für H1 */
  page-break-after: avoid;
  position: relative;
}

h1:first-of-type {
  page-break-before: avoid;
}

/* H1 mit subtiler visueller Auflockerung */
h1:before {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #009fff; /* Vivid Blue Akzent */
  margin-bottom: 0.8em;
  border-radius: 2px;
}

h2 {
  font-size: 10pt; /* Secondary body headline - 10pt bold aus Style Guide */
  font-weight: bold;
  margin-top: 2em;
  margin-bottom: 1em;
  color: #002645; /* Headlines color aus Style Guide */
  page-break-after: avoid;
}

h3 {
  font-size: 10pt; /* Body text size für H3 */
  font-weight: bold;
  color: #002645;
  position: relative;
  margin-top: 1.5em;
  page-break-after: avoid;
}

h3:before {
  content: '';
  position: absolute;
  left: -1em;
  top: 0.6em;
  width: 4px;
  height: 1.2em;
  background: var(--gs-orange);
  border-radius: 2px;
}

h4 {
  font-size: 10pt; /* Body text size */
  font-weight: 400;
  color: #5b6c79; /* Body text color */
  page-break-after: avoid;
}

h5, h6 {
  font-size: 10pt; /* Body text size */
  font-weight: 400;
  color: #5b6c79; /* Body text color */
  page-break-after: avoid;
}

p {
  margin: 1em 0;
  text-align: justify;
  color: #5b6c79; /* Body text color aus Style Guide */
  font-weight: 400; /* Body text - regular aus Style Guide */
  font-size: 10pt; /* Body text - 10pt aus Style Guide */
  orphans: 2;
  widows: 2;
}

/* Professional Lists - Keep lists together with their titles */
ul, ol {
  margin: 1.2em 0;
  padding-left: 2.5em;
  page-break-inside: avoid; /* Verhindert Aufteilung der Liste über Seiten */
  page-break-before: auto; /* Automatischer Seitenumbruch vor Liste wenn nötig */
  orphans: 2; /* Mindestens 2 Zeilen am Ende einer Seite */
  widows: 2; /* Mindestens 2 Zeilen am Anfang einer Seite */
}

/* Verhindert Seitenumbruch zwischen Text/Überschriften und Listen */
p + ul, p + ol, 
h1 + ul, h1 + ol,
h2 + ul, h2 + ol,
h3 + ul, h3 + ol,
h4 + ul, h4 + ol,
h5 + ul, h5 + ol,
h6 + ul, h6 + ol {
  page-break-before: avoid !important; /* Keine Trennung von vorangehendem Text */
}

/* Text vor Listen soll mit der Liste zusammenbleiben */
p:has(+ ul), p:has(+ ol),
h1:has(+ ul), h1:has(+ ol),
h2:has(+ ul), h2:has(+ ol),
h3:has(+ ul), h3:has(+ ol),
h4:has(+ ul), h4:has(+ ol),
h5:has(+ ul), h5:has(+ ol),
h6:has(+ ul), h6:has(+ ol) {
  page-break-after: avoid !important; /* Verhindert Umbruch nach dem Titel */
}

li {
  margin: 0.5em 0;
  line-height: 1.6;
  page-break-inside: avoid; /* Verhindert Aufteilung einzelner Listenpunkte */
  orphans: 2;
  widows: 2;
}

ul li {
  list-style-type: none;
  position: relative;
}

ul li:before {
  content: '•';
  color: var(--gs-vivid-blue);
  font-weight: bold;
  position: absolute;
  left: -1.5em;
  font-size: 1.2em;
}

/* Code Styling */
code {
  font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.9em;
  background-color: var(--gs-white);
  color: var(--gs-vivid-blue);
  padding: 0.3em 0.5em;
  border-radius: 4px;
  border: 1px solid var(--gs-white);
  font-weight: 500;
}

pre {
  background-color: var(--gs-blue);
  color: var(--gs-pure-white);
  border-radius: 8px;
  padding: 1.5em;
  overflow-x: auto;
  margin: 2em 0;
  page-break-inside: avoid;
  position: relative;
}

pre:before {
  content: 'CODE';
  position: absolute;
  top: 0.5em;
  right: 1em;
  font-size: 0.7em;
  color: var(--gs-shadow-blue);
  font-weight: 600;
  letter-spacing: 0.1em;
}

pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.85em;
  line-height: 1.5;
  border: none;
  font-weight: 400;
}

/* Professional Blockquotes */
blockquote {
  border-left: 4px solid var(--gs-orange);
  margin: 2em 0;
  padding: 1.5em;
  background: linear-gradient(135deg, var(--gs-white) 0%, var(--gs-pure-white) 100%);
  border-radius: 0 8px 8px 0;
  position: relative;
  page-break-inside: avoid;
}

blockquote:before {
  content: '"';
  font-size: 4em;
  color: var(--gs-vivid-blue);
  position: absolute;
  top: -0.2em;
  left: 0.3em;
  font-family: Georgia, serif;
  opacity: 0.3;
}

blockquote p {
  margin: 0.5em 0;
  font-style: italic;
  color: var(--gs-electric-blue);
  position: relative;
  z-index: 1;
}

/* Professional Tables */
table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  margin: 2em 0;
  font-size: 0.9em;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  page-break-inside: avoid;
}

th, td {
  padding: 1em;
  text-align: left;
  border-bottom: 1px solid var(--gs-white);
}

th {
  background: linear-gradient(135deg, var(--gs-blue) 0%, var(--gs-black) 100%);
  color: var(--gs-pure-white);
  font-weight: 600;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

th:first-child {
  border-top-left-radius: 8px;
}

th:last-child {
  border-top-right-radius: 8px;
}

td {
  background-color: var(--gs-pure-white);
  color: var(--gs-electric-blue);
}

tr:nth-child(even) td {
  background-color: var(--gs-white);
}

tr:hover td {
  background-color: #e6f3ff;
}

/* Links */
a {
  color: var(--gs-vivid-blue);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

a:hover {
  border-bottom-color: var(--gs-vivid-blue);
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 2em auto;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  page-break-inside: avoid;
}

/* Section Dividers */
hr {
  border: none;
  height: 3px;
  background: linear-gradient(90deg, var(--gs-vivid-blue) 0%, var(--gs-white) 100%);
  margin: 3em 0;
  border-radius: 2px;
}

/* Status Indicators */
.status-success {
  color: var(--gs-green);
  font-weight: 600;
}

.status-warning {
  color: var(--gs-orange);
  font-weight: 600;
}

.status-error {
  color: #ff4444;
  font-weight: 600;
}

.highlight {
  background: linear-gradient(120deg, transparent 0%, var(--gs-orange) 0%, var(--gs-orange) 100%, transparent 100%);
  background-size: 100% 0.3em;
  background-repeat: no-repeat;
  background-position: 0 85%;
  padding: 0.1em 0;
}



/* Print Optimization - A4 Spezifisch */
@media print {
  body {
    margin: 0;
    padding: 20mm;
    font-size: 10pt;
    background: white;
    /* A4: 210mm × 297mm */
    max-width: 170mm; /* 210mm - 2×20mm margins */
  }
  
  /* A4 Page Setup */
  @page {
    size: A4;
    margin: 25mm 20mm;
    counter-increment: page;
  }
  
  /* Nur H1 auf neuer Seite */
  h1 {
    font-size: 2.2em;
    page-break-before: always;
    page-break-after: avoid;
  }
  
  h1:first-of-type {
    page-break-before: avoid;
  }
  
  h2 {
    font-size: 1.3em;
    page-break-after: avoid;
  }
  
  /* Kleinere Unterkapitel */
  h3 {
    font-size: 1.1em;
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  
  h4 {
    font-size: 1.0em;
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  
  h5, h6 {
    font-size: 0.9em;
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  
  /* Bessere Absatz-Kontrolle */
  p, blockquote {
    orphans: 3;
    widows: 3;
    page-break-inside: avoid;
  }
  
  /* Zusammenhängende Elemente */
  img, table, pre, blockquote {
    page-break-inside: avoid;
    page-break-before: auto;
  }
  
  /* Listen zusammenhalten - verstärkt für Print */
  ul, ol {
    page-break-inside: avoid !important; /* Starkes Verbot der Aufteilung */
    page-break-before: auto;
    break-inside: avoid; /* CSS3 Alternative */
    orphans: 3; /* Verstärkt für Print */
    widows: 3;
  }
  
  /* Verhindert Trennung von Titeln und Listen beim Drucken */
  p + ul, p + ol, 
  h1 + ul, h1 + ol,
  h2 + ul, h2 + ol,
  h3 + ul, h3 + ol,
  h4 + ul, h4 + ol,
  h5 + ul, h5 + ol,
  h6 + ul, h6 + ol {
    page-break-before: avoid !important;
    break-before: avoid;
  }
  
  /* Titel vor Listen */
  p:has(+ ul), p:has(+ ol),
  h1:has(+ ul), h1:has(+ ol),
  h2:has(+ ul), h2:has(+ ol),
  h3:has(+ ul), h3:has(+ ol),
  h4:has(+ ul), h4:has(+ ol),
  h5:has(+ ul), h5:has(+ ol),
  h6:has(+ ul), h6:has(+ ol) {
    page-break-after: avoid !important;
    break-after: avoid;
  }
  
  li {
    page-break-inside: avoid !important; /* Starkes Verbot für Listenpunkte */
    break-inside: avoid; /* CSS3 Alternative */
    orphans: 2;
    widows: 2;
  }
  
  a {
    color: var(--gs-electric-blue);
    text-decoration: underline;
  }
  
  /* URLs für externe Links anzeigen */
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: var(--gs-shadow-blue);
  }
  
  .gs-report-header {
    page-break-after: always;
  }
  
  /* Giant Swarm Logo für Print */
  .gs-logo-header {
    display: block;
    text-align: center;
    margin-bottom: 2em;
  }
}
`;

program
  .name('giantswarm-report-generator')
  .description('Giant Swarm Professional Report Generator - Transform Platform Engineering documentation into polished PDFs')
  .version(version);

program
  .argument('<input>', 'Input markup file path')
  .option('-o, --output <file>', 'Output PDF file path')
  .option('-t, --title <title>', 'Report title')
  .option('-s, --subtitle <subtitle>', 'Report subtitle')
  .option('-a, --author <author>', 'Report author', 'Giant Swarm Platform Engineering Team')
  .option('--css <file>', 'Custom CSS file path')
  .option('--format <format>', 'Page format (Standard: A4 - entspricht Giant Swarm Style Guide)', 'A4')
  .option('--margin <margin>', 'Page margins (e.g., 20mm)', '20mm')
  .option('--gs-header', 'Add Giant Swarm branded header and footer')
  .action(async (input, options) => {
    try {
      console.log(chalk.blue('🔄 Giant Swarm Report Generator'));
      console.log(chalk.gray('Platform Engineering Documentation → Professional PDF'));
      console.log(chalk.gray('━'.repeat(60)));

      // Resolve input file path
      const inputFile = resolve(input);
      
      // Validate input file
      if (!existsSync(inputFile)) {
        console.error(chalk.red(`❌ Input file not found: ${inputFile}`));
        process.exit(1);
      }

      const supportedFormats = ['md', 'markdown', 'txt'];
      const extension = inputFile.split('.').pop()?.toLowerCase();
      if (!supportedFormats.includes(extension || '')) {
        console.error(chalk.red(`❌ Unsupported file format. Supported formats: ${supportedFormats.join(', ')}`));
        process.exit(1);
      }

      // Generate output file path if not provided
      let outputFile = options.output;
      if (!outputFile) {
        const inputBasename = basename(inputFile, extname(inputFile));
        const inputDir = dirname(inputFile);
        outputFile = join(inputDir, `${inputBasename}.pdf`);
      } else {
        outputFile = resolve(outputFile);
      }

      // Load custom CSS if provided
      let finalCSS = giantSwarmCSS;
      if (options.css) {
        const cssPath = resolve(options.css);
        if (!existsSync(cssPath)) {
          console.error(chalk.red(`❌ Custom CSS file not found: ${cssPath}`));
          process.exit(1);
        }
        try {
          const userCSS = readFileSync(cssPath, 'utf-8');
          finalCSS = giantSwarmCSS + '\\n\\n/* Custom Styles */\\n' + userCSS;
          console.log(chalk.green(`✅ Custom styling loaded: ${cssPath}`));
        } catch (error) {
          console.error(chalk.red(`❌ Error reading CSS file: ${error}`));
          process.exit(1);
        }
      }

      // Display report info
      console.log(chalk.cyan(`📄 Source:    ${inputFile}`));
      console.log(chalk.cyan(`📑 Output:    ${outputFile}`));
      if (options.title) {
        console.log(chalk.cyan(`📋 Title:     ${options.title}`));
      }
      if (options.subtitle) {
        console.log(chalk.cyan(`📝 Subtitle:  ${options.subtitle}`));
      }
      console.log(chalk.cyan(`👤 Author:    ${options.author}`));
      console.log(chalk.cyan(`📐 Format:    ${options.format}`));
      console.log(chalk.cyan(`📏 Margins:   ${options.margin}`));
      if (options.gsHeader) {
        console.log(chalk.cyan(`🎨 Branding:  Giant Swarm Professional`));
      }
      console.log(chalk.gray('━'.repeat(60)));

      // Perform conversion
      const startTime = Date.now();
      
      const pdfOptions: any = {
        css: finalCSS,
        body_class: 'markdown-body',
        marked_options: {
          gfm: true,
          breaks: false,
        },
        pdf_options: {
          format: 'A4', // Immer A4 für Giant Swarm Reports
          width: '210mm',
          height: '297mm',
          margin: {
            top: '15mm',   /* Platz für Mouse type headline */
            bottom: '15mm', /* Platz für Page number und Logo */
            left: '14mm',   /* Style Guide: 14mm seitlich */
            right: '14mm'   /* Style Guide: 14mm seitlich */
          },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: `
            <div style="font-size: 6pt; color: #5b6c79; text-transform: uppercase; width: 100%; padding: 0 14mm;">
              <span>${options.title || 'Giant Swarm Report'}</span>
            </div>
          `,
          footerTemplate: `
            <div style="width: 100%; padding: 0 14mm; display: flex; justify-content: space-between; align-items: center; height: 15mm;">
              <span style="font-size: 12pt; font-weight: bold; color: #002645;">
                <span class="pageNumber"></span>
              </span>
              <img src="data:image/png;base64,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" style="height: 4mm; width: auto;" />
            </div>
          `
        }
      };

      console.log('🔄 Generating Giant Swarm professional report...');
      
      // Use direct file output approach
      pdfOptions.dest = outputFile;
      
      // Use direct file path approach
      const result = await mdToPdf({ path: inputFile }, pdfOptions);
      
      const duration = Date.now() - startTime;
      
      console.log(chalk.gray('━'.repeat(60)));
      console.log(chalk.green(`🎉 Report generated successfully in ${duration}ms`));
      console.log(chalk.green(`📄 Professional PDF ready: ${outputFile}`));
      console.log(chalk.gray(`✨ Generated with Giant Swarm professional styling`));

    } catch (error) {
      console.log(chalk.gray('━'.repeat(60)));
      console.error(chalk.red('❌ Report generation failed:'));
      console.error(chalk.red(error instanceof Error ? error.message : String(error)));
      console.log(chalk.gray('Contact the Giant Swarm Platform Engineering team for support.'));
      process.exit(1);
    }
  });

// Add Giant Swarm specific examples
program.addHelpText('after', `
Examples:
  $ npm run generate-report platform-assessment.md
  $ npm run generate-report architecture-review.md -o reports/arch-review.pdf
  $ npm run generate-report onboarding.md --title "Platform Onboarding Guide" --subtitle "Developer Experience"
  $ npm run generate-report k8s-migration.md --author "Platform Engineering Team" --gs-header
  $ npm run generate-report best-practices.md --format A4 --margin 25mm

Giant Swarm Use Cases:
  • Platform Engineering documentation
  • Architecture assessments and reviews  
  • Kubernetes migration plans
  • Developer onboarding guides
  • Technical reports and proposals
  • Client deliverables and presentations

Supported input formats: md, markdown, txt
Learn more about Giant Swarm: https://www.giantswarm.io/
`);

if (require.main === module) {
  program.parse();
}
