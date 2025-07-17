# GitHub AI Development Toolkit

This repository contains a comprehensive toolkit for working with GitHub APIs and generating automated reports. It includes both a production-ready application and extensive development documentation for AI-assisted development.

## 🚀 What's Included

### 📊 Issue Report Generator App
A complete TypeScript application that generates comprehensive issue reports from GitHub Projects:

- **Smart Issue Categorization**: Automatically groups issues by Kind (Story, Request, Postmortem, Other)
- **Intelligent Tense Handling**: Uses appropriate past/present/future tense based on issue status
- **Modern Web UI**: React-based interface with real-time preview and markdown export
- **GitHub API Integration**: Full REST and GraphQL API support with rate limiting

**📍 Location**: `issue-report-app/`  
**🚀 Quick Start**: `cd issue-report-app && ./start.sh`

### 📚 AI Development Instructions
Comprehensive documentation designed to help AI assistants (like GitHub Copilot, Claude, or GPT) understand and work with GitHub APIs effectively:

- **GitHub API Development Guide**: Complete context for working with GitHub's REST and GraphQL APIs
- **Issue Creation Workflows**: Detailed instructions for automated issue management
- **Monthly Bulletin Generation**: Templates and patterns for automated reporting

**📍 Location**: `instructions/`

## 🎯 Use Cases

### For Developers
- Generate automated issue reports for team standups
- Create comprehensive project status summaries
- Automate GitHub project management workflows
- Build custom GitHub API integrations

### For AI Assistants
- Understand GitHub API patterns and best practices
- Learn proper error handling and rate limiting
- Get context for building GitHub automation tools
- Access proven templates for common GitHub workflows

## 🏗️ Project Structure

```
github-ai/
├── issue-report-app/          # Production application
│   ├── src/                   # Backend (Node.js + Express + TypeScript)
│   ├── ui/                    # Frontend (React + TypeScript)
│   ├── start.sh               # One-command startup script
│   └── README.md              # Detailed app documentation
├── instructions/              # AI development context
│   ├── github-api-development.md  # Complete GitHub API guide
│   ├── create-Issue.md            # Issue creation workflows
│   └── monthly-bulletin.md        # Report generation patterns
└── README.md                  # This overview file
```

## 🚀 Getting Started

### Option 1: Use the Application
```bash
cd issue-report-app
./start.sh
```
Visit http://localhost:3001 to generate issue reports.

### Option 2: Learn from the Instructions
Browse the `instructions/` folder for comprehensive guides on:
- GitHub API development patterns
- Automated issue management
- Report generation workflows

## 🔧 Key Features

### Application Features
- ✅ **Team & Status Filtering**: Dynamic filtering with viable options only
- ✅ **Smart Categorization**: Automatic grouping by issue type
- ✅ **Tense-Aware Reports**: Context-appropriate language
- ✅ **Epic Handling**: Intelligent parent/child relationship management
- ✅ **Modern UI**: Responsive design with real-time preview
- ✅ **API-First Design**: RESTful endpoints for integration

### Development Features
- ✅ **TypeScript**: Full type safety throughout
- ✅ **Rate Limiting**: Built-in GitHub API protection
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Modular Architecture**: Clean separation of concerns
- ✅ **Documentation**: Extensive inline and external docs

## 🤖 AI Development Context

The `instructions/` folder contains specialized documentation designed for AI assistants:

### `github-api-development.md`
- Complete GitHub API development patterns
- REST vs GraphQL selection guidelines
- Rate limiting and error handling strategies
- Schema discovery and validation techniques
- Common pitfalls and solutions

### `create-Issue.md`
- Automated issue creation workflows
- Template-based issue generation
- Label and assignee management
- Cross-repository issue linking

### `monthly-bulletin.md`
- Report generation patterns
- Data aggregation strategies
- Markdown formatting templates
- Automated summary creation

## 🔗 Quick Links

- **[Application Documentation](issue-report-app/README.md)** - Detailed app setup and usage
- **[GitHub API Guide](instructions/github-api-development.md)** - Complete API development context
- **[Issue Creation Guide](instructions/create-Issue.md)** - Automated issue workflows
- **[Report Generation Guide](instructions/monthly-bulletin.md)** - Bulletin and report patterns

## 📄 License

MIT License - Feel free to use this toolkit for your own GitHub automation projects!

---

**💡 Tip**: This repository serves as both a working application and a comprehensive reference for AI-assisted GitHub API development. The instructions folder is particularly valuable when working with AI coding assistants on GitHub-related projects.