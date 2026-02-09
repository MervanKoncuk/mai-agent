
# 🛠️ Skill: API Design & Standardization
**Primary Agent:** [ARCHITECT]
**Secondary Agents:** [DEV], [QA]

---

## 1. RESTful Principles (Beyond Basics)
- **Safe vs Idempotent:** Understand which methods are safe (GET, HEAD) and idempotent (PUT, DELETE).
- **Resource Naming:** Use nouns, pluralize collections (`/users`, `/users/{id}`), use hyphens for multi-word paths (`/user-profiles`).
- **Nesting:** Max depth of 2 (`/users/{id}/posts`). Beyond that, flatten the resource (`/posts?userId={id}`).

## 2. Response Envelope Pattern
All API responses must follow this standard JSON envelope:

```typescript
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;       // "VALIDATION_ERROR"
    message: string;    // "Email is invalid"
    details?: any;      // Zod/Joi error object
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};
```

## 3. Versioning Strategy
- **URL Versioning:** `/api/v1/resource` (MANDATORY).
- **Deprecation Policy:** Add `Warning` header: `Warning: 299 - "This endpoint will be deprecated on 2026-01-01"`.

## 4. Query Parameter Standards
- **Filtering:** `?status=active`
- **Sorting:** `?sort=-created_at` (descending), `?sort=name` (ascending)
- **Pagination:** `?page=1&limit=20`
- **Fields:** `?fields=id,name,email` (Partial response)

## 5. HTTP Status Codes (Strict Usage)
- **200:** OK
- **201:** Created (Return `Location` header)
- **204:** No Content (For DELETE success)
- **400:** Bad Request (Validation errors)
- **401:** Unauthorized (Authentication missing)
- **403:** Forbidden (Permissions missing)
- **404:** Not Found (Resource doesn't exist)
- **422:** Unprocessable Entity (Business logic failure)
- **500:** Internal Server Error (Never leak stack traces)

## 6. Security Headers Check
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS)
