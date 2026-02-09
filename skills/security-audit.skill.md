
# 🛠️ Skill: Secure Coding Checklist (OWASP Focus)
**Primary Agent:** [CISO]
**Secondary Agents:** [DEV], [ARCHITECT]

---

## 1. Input Validation (The Golden Rule)
- **Frontend:** Validate forms (Zod/Yup) for better UX.
- **Backend:** **NEVER TRUST FRONTEND.** Validate specific schemas on API entry.
- **Sanitization:** Strip dangerous characters (`<script>`, `javascript:`) before processing strings.

## 2. Authentication & Authorization
- **JWT:** Store in `httpOnly` cookies, never `localStorage` (XSS vulnerable).
- **CSRF:** Use anti-CSRF tokens for mutating requests (POST/PUT/DELETE).
- **RBAC:** Verify permissions (`user.role === 'admin'`) on **every** protected endpoint logic, not just the route middleware.

## 3. Data Protection
- **Secrets:** Never commit `.env` files. Use secret managers (Vault, AWS Secrets Manager).
- **Logging:** Sanitize logs. **Never log:**
    - Passwords
    - API Keys
    - Tokens
    - PII (Emails, Names, Addresses) unless encrypted.
- **Encryption:** Use bcrypt/Argon2 for password hashing. Encrypt sensitive columns (SSN, health data) at rest.

## 4. Dependency Management
- **Lockfiles:** Commit `package-lock.json` / `yarn.lock` to ensure deterministic builds.
- **Audit:** Run `npm audit` in CI/CD pipelines. Block critical vulnerabilities.
- **Updates:** Regularly update dependencies (Dependabot/Renovate).

## 5. Error Handling Security
- **Generic Messages:** Return "An unexpected error occurred" to users.
- **Internal Details:** Log stack traces internally, never send them in HTTP responses (prevents path disclosure).
