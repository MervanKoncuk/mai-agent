# ⬇️ Installation Guide

MAI Agents can be installed as a global CLI tool or added to a specific project.

## Prerequisites
- **Node.js**: v18.0.0 or higher.
- **Git**: Installed and configured.
- **Text Editor**: VS Code (Recommended) or Cursor.

## Method 1: Global CLI (Recommended)

Install the MAI tool globally to create new agencies anywhere.

```bash
npm install -g mai-agents
```

*(Note: While in private beta, use `npm link` from the source directory)*

### Usage
To start a new project:
```bash
mai init
```
Follow the interactive prompts to set up your agency.

## Method 2: Git Clone (Manual)

If you prefer to manually manage the agent files:

1.  Clone the repository into your project root:
    ```bash
    git clone https://github.com/mai-agents/core.git mai-agent
    ```
2.  Run the setup script:
    ```bash
    node mai-agent/lib/setup.js
    ```

## Post-Installation
Once installed, verify your system status:

```bash
mai status
```

You should see the **MAI MEMORY** output indicating the system is `Active`.
