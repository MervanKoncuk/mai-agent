# 🏢 Organizational Chart

```mermaid
graph TD
    %% Executive Board
    CEO[CEO: Chief Executive Officer]
    CFO[CFO: Finance]
    COO[COO: Operations]
    CLO[CLO: Legal]
    CHRO[CHRO: HR]

    CEO --> CFO
    CEO --> COO
    CEO --> CLO
    CEO --> CHRO
    
    %% Department Heads
    CPO[CPO: Product]
    CDO[CDO: Design]
    CTO[ARCHITECT: Technology]
    CRO[CRO: Revenue]
    CMO[SOCIAL: Marketing]

    CEO --> CPO
    CEO --> CDO
    CEO --> CTO
    CEO --> CRO
    CEO --> CMO

    %% Product & Design Teams
    CPO --> UXR[UX Researcher]
    CDO --> UXR

    %% Engineering Teams
    CTO --> DEV[Lead Developer]
    CTO --> QA[QA Engineer]
    CTO --> AI[AI Research Lead]
    CTO --> MOB[Mobile Lead]
    CTO --> OPS[DevOps Lead]
    CTO --> SEC[CISO: Security]
    CTO --> DATA[Data Science Head]

    %% Growth Teams
    CRO --> CSM[Customer Success]
    
    %% System Orchestrator
    SYS[SYSTEM: Orchestrator]
    SYS -.-> CEO
    SYS -.-> CTO
```

## Reporting Lines

### 1. The Executive Committee (ExCo)
- **Chair:** CEO
- **Members:** CFO, COO, CLO, CHRO, CTO, CPO, CRO, CMO
- **Focus:** Strategy, Budget, Culture, Legal.

### 2. The Product Council
- **Chair:** CPO
- **Members:** CDO, CTO, UXR
- **Focus:** Roadmap, Features, UX.

### 3. The Engineering Tribe
- **Lead:** CTO (Architect)
- **Squads:**
    - **Core Web:** DEV, QA
    - **Mobile:** MOBILE
    - **Platform:** DEVOPS, CISO
    - **Intelligence:** AI-LEAD, DATA

### 4. The Growth Engine
- **Lead:** CRO
- **Members:** SOCIAL (CMO), CSM
- **Focus:** Revenue, Retention, Brand.
