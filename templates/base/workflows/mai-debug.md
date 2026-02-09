---
description: Advanced debugging and error resolution workflow
---

# 🐞 Debug Mode

## Trigger
Use `/debug [Error ID or Description]` to initiate the resolution protocol.

## Protocol

### Phase 1: Replication (The "What")
**Agent:** [QA]
1.  Analyze the provided error log or description.
2.  Attempt to reproduce the issue.
3.  Create a minimal reproduction code snippet or scenario.
4.  **Output:** `Reproduction Steps`

### Phase 2: Root Cause Analysis (The "Why")
**Agent:** [ARCHITECT]
1.  Trace the error through the stack.
2.  Identify the specific module, function, or logic failure.
3.  Check if this violates `mai-protocol.md` or system constraints.
4.  **Output:** `RCA Report` (Root Cause Analysis)

### Phase 3: The Fix (The "How")
**Agent:** [DEV]
1.  Propose the code change.
2.  Implement the fix.
3.  Ensure no new regressions are introduced (do not break existing features).
4.  **Output:** `Fix Logic` + `Modified Code`

### Phase 4: Verification
**Agent:** [QA]
1.  Test the fix against the reproduction steps.
2.  Run generic smoke tests.
3.  **Verdict:** ✅ FIXED or ❌ FAILED

## Usage Example
```
User: /debug The login button spins forever when password is wrong.
QA: Replicating... Confirmed. API returns 401 but UI doesn't catch it.
ARCHITECT: Root cause is missing ErrorBoundary in Auth component.
DEV: Adding try/catch block and error state.
QA: Verified. UI now shows "Invalid credentials".
```
