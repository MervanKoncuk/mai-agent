
# 🛠️ Skill: DevOps Pipeline Standards (CI/CD)
**Primary Agent:** [DEVOPS]
**Secondary Agents:** [QA], [DEV]

---

## 1. Branching Strategy (GitFlow Lite)
- `main`: Production-ready code. Protected branch.
- `dev` / `staging`: Integration testing branch.
- `feat/feature-name`: Feature development.
- `fix/bug-name`: Bug fixes.

## 2. CI Pipeline (Pull Requests)
Every PR must pass these checks *before* merging:
1.  **Lint:** `npm run lint` (ESLint)
2.  **Type Check:** `npm run tsc` (TypeScript)
3.  **Unit Tests:** `npm run test:unit` (Jest/Vitest)
4.  **Build:** `npm run build` (Next.js build check)

## 3. CD Pipeline (Deployment)
**Trigger:** Push to `main` (Production) or `dev` (Staging).
1.  **Environment Setup:** Inject secrets from GitHub Secrets.
2.  **Containerize:** Build Docker image.
    *   *Optimization:* Use multi-stage builds to keep image size small (Example: node:alpine).
3.  **Push Registry:** Push to AWS ECR / Docker Hub / GHCR.
4.  **Deploy:** Update Kuberenetes Manifest / ECS Service / Vercel.

## 4. Monitoring & Rollback
- **Health Check:** `/api/health` endpoint must return 200 OK.
- **Rollback Strategy:** Blue/Green deployment or Canary releases for critical apps.
- **Alerting:** PagerDuty/Slack notification on deployment failure.

## 5. Infrastructure as Code (IaC)
- Prefer Terraform or Pulumi over manual console clicks.
- Store state files remotely (S3 + DynamoDB Lock).
