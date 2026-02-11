---
description: Execute the full development lifecycle from spec to launch
---

# 🔴 Party Mode Workflow

## Trigger
Use `/party {{task}}` to execute the development lifecycle.

## Process

### Step 0: Agent Role Call
System identifies the following participants:
{{agents_list}}

### Step 1: [SYSTEM] Create User Story
```markdown
**User Story:** As a [user type], I want to [action] so that [benefit].

**Acceptance Criteria:**
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3
```

### Step 2: [ARCHITECT] Technical Specification
Create `spec.md` with:
- Data model / Schema
- API endpoints
- Logic flow diagram
- Component structure

### Step 3: [DEV] Implementation
Write production-ready code:
// turbo-all
1. Create necessary files following naming conventions
2. Implement core functionality
3. Add TypeScript types
4. Include error handling
5. Add loading states

### Step 4: [QA] Code Review
Review the implementation:
- Check against acceptance criteria
- Test edge cases
- Verify responsive design
- Security check

**Verdict:**
- ✅ **APPROVED** → Proceed to Step 5
- ❌ **REJECTED** → Return to Step 3 with bug report

### Step 5: [SOCIAL] Launch Content
Generate marketing assets:
1. Twitter/X Thread (5-7 tweets)
2. Instagram Reel Script
3. LinkedIn Post

### Step 6: [SYSTEM] Mission Complete
Present final report:

```markdown
## 🎉 Mission Accomplished

**Task:** {{task}}
**Status:** Shipped ✅

### Deliverables
- [x] Code implementation
- [x] QA approved
- [x] Launch content ready

### Files Created/Modified
- `path/to/file1.tsx`
- `path/to/file2.ts`

### Next Steps
[Any follow-up items]
```

## Quality Gates

| Gate | Owner | Criteria |
|------|-------|----------|
| Spec Approval | ARCHITECT | Clear, complete specification |
| Code Complete | DEV | All features implemented |
| QA Pass | QA | All tests passing, no critical bugs |
| Launch Ready | SOCIAL | Content prepared, SEO optimized |
