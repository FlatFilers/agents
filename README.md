# Flatfile Agents

This repository contains compiled distributions of Flatfile plugins that can be deployed as Lambda agents through the Flatfile dashboard.

## Overview

Each directory contains a standalone agent that wraps a specific Flatfile plugin, providing data extraction and processing capabilities for different file formats. The agents are pre-compiled and bundled for easy deployment in serverless environments.

## Available Agents

### Data Extraction Agents

#### 🔗 **extract-html-table**
Extracts data from HTML tables in uploaded files.
- **Plugin**: `@flatfile/plugin-extract-html-table`
- **Use Case**: Parse HTML files containing tabular data
- **Output**: Structured data from HTML tables

#### 📄 **json-extractor**
Processes and extracts data from JSON files.
- **Plugin**: `@flatfile/plugin-json-extractor`
- **Use Case**: Import and transform JSON data structures
- **Output**: Flattened or restructured JSON data

#### 📝 **markdown-extractor**
Extracts structured content from Markdown files.
- **Plugin**: `@flatfile/plugin-markdown-extractor`
- **Use Case**: Parse Markdown documents for data tables or structured content
- **Output**: Extracted tabular data from Markdown

#### 📊 **xlsx-extractor**
Processes Excel files (.xlsx format).
- **Plugin**: `@flatfile/plugin-xlsx-extractor`
- **Use Case**: Import data from Excel spreadsheets
- **Output**: Structured data from Excel worksheets

#### 🏷️ **xml-extractor**
Extracts and transforms data from XML files.
- **Plugin**: `@flatfile/plugin-xml-extractor`
- **Use Case**: Parse XML documents and convert to tabular format
- **Output**: Structured data from XML elements

#### 📦 **zip-extractor**
Processes ZIP archives containing data files.
- **Plugin**: `@flatfile/plugin-zip-extractor`
- **Use Case**: Extract and process files within ZIP archives
- **Output**: Processes contained files using appropriate extractors

### Validation Agents

#### ✅ **constraints**
Applies data validation rules and constraints.
- **Plugin**: `@flatfile/plugin-stored-constraints`
- **Use Case**: Validate imported data against predefined rules
- **Output**: Data validation results and error reporting

## Repository Structure

```
agents/
├── extract-html-table/
│   ├── dist/           # Compiled bundle for deployment
│   ├── index.js        # Agent source code
│   └── package.json    # Dependencies
├── json-extractor/
├── markdown-extractor/
├── xlsx-extractor/
├── xml-extractor/
├── zip-extractor/
├── constraints/
└── scripts/
    ├── bundle.js       # Build script
    └── _entry.js       # Runtime entry point
```

## Deployment

Each agent directory contains a `dist/` folder with the compiled JavaScript bundle ready for Lambda deployment.

### Prerequisites
- Node.js environment
- Access to Flatfile dashboard
- Appropriate permissions for Lambda deployment

### Building Agents

To rebuild all agent distributions:

```bash
npm run update
```

This command will:
1. Update version information
2. Bundle all agents using Vercel's `ncc` compiler
3. Generate optimized `dist/index.js` files for each agent

### Individual Agent Structure

Each agent follows this pattern:

```javascript
import { PluginName } from '@flatfile/plugin-name'

export default (listener) => {
  listener.use(PluginName())
}
```

## Development

### Adding a New Agent

1. Create a new directory with the agent name
2. Add `package.json` with required dependencies
3. Create `index.js` with the plugin implementation
4. Run `npm run update` to generate the distribution

### Build Process

The build process uses:
- **@vercel/ncc**: Compiles and bundles Node.js projects
- **Target**: ES2020 for modern Lambda environments
- **Minification**: Enabled for smaller bundle sizes
- **Entry Point**: Auto-generated runtime wrapper

## Usage in Flatfile

These agents are deployed through the Flatfile dashboard and automatically handle:
- File upload events
- Data extraction based on file type
- Error handling and reporting
- Integration with Flatfile's data processing pipeline

## Dependencies

- `@flatfile/listener`: Core Flatfile event listener
- Individual plugin packages for specific functionality
- Runtime dependencies bundled in distributions

## Support

For issues or questions regarding these agents, please refer to the [Flatfile documentation](https://flatfile.com/docs) or contact support.
