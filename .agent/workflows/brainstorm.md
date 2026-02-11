---
description: Round-table discussion with all agents analyzing a topic strategically
---

# 🔵 MAI Brainstorm Workflow

## Trigger
## Trigger
Use `/brainstorm {{topic}}` to initiate a round-table discussion.
**Language:** Uses `Default Language` from `MAI_MEMORY.md` (currently {{language}}) unless specified.

## Process

### Step 1: Agent Role Call
System identifies the following participants:
{{agents_list}}

### Step 2: 🗣️ The Dialogue (Round-Table)
**System Instruction:** Generate a script where agents discuss the topic: "**{{topic}}**" in **{{language}}**.

*Format:*
> **[CEO]:** [Strategic view on {{topic}}...]
> **[SOCIAL]:** [Market potential...]
> **[ARCHITECT]:** [Technical feasibility...]
> ... (Debate continues) ...

### Step 3: 📝 The Consensus (Summary)
Compile the discussion into a final report:

```markdown
## 📋 Brainstorm Report: {{topic}}

### 🗣️ Discussion Highlights
(Summary of the debate above)

### 🚦 Verdict
[CEO] Final Decision: ✅ PROCEED / ❌ KILL / ⚠️ RESEARCH

### 🗺️ Roadmap
1. [Step 1]
2. [Step 2]
```

## Output
1. Display the **Dialogue** to the user.
2. Save the **Report** to `implementation_plan.md` (if approved).
