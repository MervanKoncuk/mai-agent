# 🎮 Usage & Workflows

MAI Agents operates via **Slash Commands**. These workflows coordinate multiple agents to achieve complex goals.

## 🔵 Strategy: `/brainstorm`
**Goal:** Strategic planning and decision making.
**Trigger:** `/brainstorm "Topic Name"`
**Process:**
1.  **CEO** analyzes business value.
2.  **CTO** assesses technical feasibility.
3.  **Marketing** evaluates growth potential.
4.  **System** generates a consensus report.

*Tip: If you don't specify a language, it defaults to your `MAI_MEMORY` setting.*

## 🔴 Execution: `/party`
**Goal:** Rapid development cycle (Design -> Code -> Review).
**Trigger:** `/party "Task Description"`
**Process:**
1.  **Product Owner** defines requirements (PRD).
2.  **Architect** designs the solution.
3.  **Developer** implements the code.
4.  **QA** verifies the output.

## 🟡 Health: `/status`
**Goal:** Check the pulse of your agency.
**Trigger:** `/status` (or `mai status` in terminal).
**Output:** Shows active tasks, current phase, and memory state.

## 🐞 Support: `/debug`
**Goal:** Fix errors and bugs.
**Trigger:** `/debug "Error Message"`
**Process:**
1.  **Reproduction:** Agents try to reproduce the issue.
2.  **Root Cause Analysis:** Identifying the source.
3.  **Fix:** Applying the patch.
4.  **Verification:** Confirming the fix works.

## 🧪 Quality: `/test`
**Goal:** Comprehensive system check.
**Trigger:** `/test`
**Process:** Runs Unit Tests, Security Audits, and Performance Scans.

## 🚀 Deployment: `/develop`
**Goal:** End-to-end feature delivery.
**Trigger:** `/develop "Feature Name"`
**Note:** This is the "Ultimate Mode" that combines all previous workflows into one long-running session.
