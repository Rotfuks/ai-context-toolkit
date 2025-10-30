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

### 📚 Development Context & Reference Materials
Comprehensive documentation and reference materials for development work:

- **GitHub API Development Guide**: Complete context for working with GitHub's REST and GraphQL APIs
- **Issue Creation Workflows**: Detailed instructions for automated issue management
- **Reference Documentation**: Curated context materials for development tasks

**📍 Location**: `context/`

### 🛠️ Temporary Workspace
A dedicated area for session-based artifacts and temporary files:

- **Session Artifacts**: Temporary documents, configurations, and prototypes
- **Development Workspace**: Staging area for work-in-progress items
- **Usage Guidelines**: Clear rules for workbench organization and cleanup

**📍 Location**: `workbench/`

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
├── workbench/                 # Temporary workspace for session artifacts
│   └── README.md              # Workbench usage guidelines
├── context/                   # Development context and reference materials
│   ├── github-api-development.md  # Complete GitHub API guide
│   └── issue-creation/            # Issue workflow documentation
├── issue-report-app/          # Production application
│   ├── src/                   # Backend (Node.js + Express + TypeScript)
│   ├── ui/                    # Frontend (React + TypeScript)
│   ├── start.sh               # One-command startup script
│   └── README.md              # Detailed app documentation
└── README.md                  # This overview file
```

## 🚀 Getting Started

### Option 1: Use the Application
```bash
cd issue-report-app
./start.sh
```
Visit http://localhost:3001 to generate issue reports.

### Option 2: Explore Development Context
Browse the `context/` folder for comprehensive guides on:
- GitHub API development patterns
- Automated issue management
- Development workflows and reference materials

### Option 3: Use the Workbench
The `workbench/` folder serves as your temporary workspace:
- Create and iterate on artifacts safely
- Stage work-in-progress files
- Follow the established workflow for moving finalized content

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

## 📂 Directory Guide

### `/workbench/` - Temporary Workspace
Your go-to location for all session-based work:
- **All new artifacts start here** [[memory:5364781]]
- Temporary documents, scripts, and configurations
- Work-in-progress files and experimental code
- See `workbench/README.md` for complete usage guidelines

### `/context/` - Development Reference Materials
Curated documentation and development context:

#### `github-api-development.md`
- Complete GitHub API development patterns
- REST vs GraphQL selection guidelines
- Rate limiting and error handling strategies
- Schema discovery and validation techniques
- Common pitfalls and solutions

#### `issue-creation/`
- Automated issue creation workflows
- Template-based issue generation
- Label and assignee management
- Cross-repository issue linking

### `/issue-report-app/` - Production Application
Ready-to-use application for generating GitHub issue reports with comprehensive documentation in its own README.

## 🔗 Quick Links

- **[Application Documentation](issue-report-app/README.md)** - Detailed app setup and usage
- **[Workbench Guidelines](workbench/README.md)** - Temporary workspace usage rules
- **[GitHub API Guide](context/github-api-development.md)** - Complete API development context
- **[Issue Creation Workflows](context/issue-creation/)** - Automated issue management

## 📄 License

MIT License - Feel free to use this toolkit for your own GitHub automation projects!

---

**💡 Tip**: This repository serves as both a working application and a comprehensive reference for GitHub API development. The context folder provides valuable reference materials, while the workbench serves as your temporary workspace for all session-based development work.