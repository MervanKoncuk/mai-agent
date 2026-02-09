
# 🛠️ Skill: Professional Product Requirement Document (PRD)
**Primary Agent:** [CPO]
**Secondary Agents:** [CEO], [ARCHITECT]

---

## 1. Context & Problem Statement
*   **Problem:** What user pain point are we solving?
*   **Goal:** What is the desired outcome?
*   **KPIs:** How do we measure success?

## 2. User Stories (Gherkin Format Preferred)
**Story:** User Login
*   **As a** registered user
*   **I want** to log in with my email
*   **So that** I can access my dashboard

## 3. Acceptance Criteria (Definition of Done)
*   [ ] User can enter email and password.
*   [ ] Invalid credentials show specific error message.
*   [ ] Successful login redirects to `/dashboard`.
*   [ ] Password field masks characters.
*   [ ] "Forgot Password" link is visible.

## 4. Technical Constraints
*   **Platform:** Web & Mobile Web.
*   **Browser Support:** Chrome, Safari, Firefox, Edge (Last 2 versions).
*   **Performance:** Login < 500ms API response.

## 5. UI/UX References
*   [Figma Link]
*   [Design Guidelines Link]
*   User Flow Diagram (Mermaid):
    ```mermaid
    graph LR
    A[Login Page] -->|Success| B[Dashboard]
    A -->|Fail| A
    A -->|Forgot| C[Recovery]
    ```

## 6. Out of Scope (What we are NOT doing)
*   Social Login (Phase 2)
*   2FA (Phase 2)
