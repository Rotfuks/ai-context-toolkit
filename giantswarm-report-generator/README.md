# Giant Swarm Report Generator

A professional PDF report generator that transforms Markdown files into beautifully formatted PDF documents using **Giant Swarm's official brand guidelines**.

## 🎯 Features

- **Giant Swarm Brand Compliance**: Uses official colors (#002645, #009fff, #5b6c79) and typography
- **Professional Typography**: Inter font family with proper hierarchy (18pt H1, 10pt body)
- **Smart Pagination**: H1 chapters start on new pages, lists stay together with their titles
- **A4 Format Standard**: 14mm side margins, optimized for professional documents
- **Logo Integration**: Official Giant Swarm logo in footer (bottom-right)
- **Intelligent Layout**: Prevents awkward page breaks in lists and content blocks

## 📋 Requirements

- Node.js (v14 or higher)
- npm
- TypeScript

## 🚀 Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## 💻 Usage

### Basic Usage
```bash
node dist/index.js input.md -o output.pdf
```

### Full Options
```bash
node dist/index.js input.md \
  --title "Report Title" \
  --subtitle "Report Subtitle" \
  --author "Author Name" \
  --output report.pdf
```

### Command Line Options
- `input.md` - Input Markdown file path
- `--title, -t` - Document title (appears in header)
- `--subtitle, -s` - Document subtitle
- `--author, -a` - Document author
- `--output, -o` - Output PDF file path

## 🎨 Brand Guidelines Implementation

### Official Giant Swarm Colors
- **Giant Swarm Blue** (#002645) - Headlines, borders, page numbers
- **Vivid Blue** (#009fff) - Accent elements, links
- **Electric Blue** (#5b6c79) - Body text
- **Giant Swarm White** (#f0f7f9) - Background elements

### Typography Hierarchy
- **H1 (Main Chapters)**: 18pt, bold, with accent bar, new page
- **H2 (Sections)**: 10pt, bold, same page
- **Body Text**: 10pt, regular
- **Page Numbers**: 12pt, bold

### Layout Standards
- **A4 Format**: 210mm × 297mm
- **Margins**: 14mm sides, 15mm top/bottom
- **Logo**: Bottom-right footer, 8mm height
- **Document Title**: Top-left header, 6pt

## 🔧 Development

### Project Structure
```
src/
├── index.ts          # Main CLI application
├── config/
│   └── environment.ts # Environment configuration
└── types/
    └── github.ts      # Type definitions

dist/                  # Compiled JavaScript output
```

### Building
```bash
npm run build
```

### Adding Features
The main styling is defined in `src/index.ts` in the `giantSwarmCSS` variable. All styles follow Giant Swarm's official brand guidelines.

## 🎯 Use Cases

Perfect for:
- **Platform Engineering Reports** - Cloud-native transformation strategies
- **Technical Documentation** - Architecture and implementation guides
- **Client Deliverables** - Professional consulting reports
- **Internal Documentation** - Team guides and standards

## 🛡️ Page Break Rules

The generator implements intelligent page break rules:
- **H1 chapters** always start on new pages
- **Lists stay together** with their titles/descriptions
- **Code blocks** avoid splitting across pages
- **Tables and images** keep together when possible

## 🔍 Troubleshooting

### Common Issues
1. **Missing fonts**: Inter font is loaded via CSS, ensure internet connection
2. **Large files**: Very large Markdown files may take longer to process
3. **Complex tables**: Very wide tables may overflow page margins

### Performance
- Typical processing time: 2-4 seconds for standard documents
- Memory usage scales with document complexity
- Recommended max file size: 5MB Markdown

## 📄 License

This tool implements Giant Swarm's official brand guidelines and should be used in accordance with their brand standards.

---

**Generated with Giant Swarm professional styling** ✨