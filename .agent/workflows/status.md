---
description: Get current project status and progress report
---

# 📊 Status Workflow

## Trigger
Use `/status` to get the current project status.

## Process

### Step 1: Read System Memory
// turbo
1. Read `MAI_MEMORY.md` for current context
2. Check `mai-logs.md` for open issues

### Step 2: Generate Status Report

```markdown
## 📊 Project Status Report

**Generated:** [Date/Time]
**Phase:** [Current Phase]

### 🎯 Active Context
[What we're currently working on]

### ✅ Recently Completed
- [Task 1]
- [Task 2]

### 🔄 In Progress
- [Current task] - [% complete]

### 📋 Up Next
- [Next task 1]
- [Next task 2]

### ⚠️ Blockers (if any)
- [Blocker description]

### 📈 Progress Overview
[Visual progress indicator or summary]
```

### Step 3: Check Agent Availability

| Agent | Status |
|-------|--------|
| [CEO] | 🟢 Ready |
| [ARCHITECT] | 🟢 Ready |
| [DEV] | 🟢 Ready |
| [QA] | 🟢 Ready |
| [SOCIAL] | 🟢 Ready |

## Quick Commands

| Command | Description |
|---------|-------------|
| `/status` | Full status report |
| `/status brief` | One-line summary |
| `/status agents` | Agent availability only |
