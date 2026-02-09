---
description: Comprehensive system testing and security scanning
---

# 🧪 Test Mode

## Trigger
## Trigger
Use `/test {{scope}}` to stress-test the system. Scope can be specific (e.g., "Auth Module") or global ("Full System").

## Protocol

### Phase 1: Functional Integrity
**Agent:** [QA]
1.  **Unit Tests:** Verify individual functions.
2.  **Integration Tests:** Verify module interactions.
3.  **UI/UX Check:** Verify design fidelity against `mai-protocol.md`.

### Phase 2: Security Scan
**Agent:** [CISO]
1.  **Vulnerability Scan:** Check for common CVEs.
2.  **Code Analysis:** Static analysis for security anti-patterns.
3.  **Auth Penetration:** Attempt (simulated) unauthorized access.
4.  **Output:** `Security Audit Report`

### Phase 3: Performance & Load
**Agent:** [DEVOPS]
1.  **Load Simulation:** Estimate behavior under high concurrency.
2.  **Resource Check:** Analyze memory/CPU efficiency.
3.  **Latency Check:** Database query performance.

### Phase 4: System Health Score
**Agent:** [SYSTEM]
Compile all metrics into a final scorecard:

```markdown
## 🏥 System Health Report

| Category | Score | Status |
|----------|-------|--------|
| Functional | 98/100 | 🟢 |
| Security | 100/100 | 🟢 |
| Performance | 85/100 | 🟡 |

**Recommendation:** [Actionable insight]
```
