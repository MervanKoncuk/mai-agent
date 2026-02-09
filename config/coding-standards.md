# 📏 Coding Standards

> Detailed coding conventions and best practices.

---

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## ESLint Rules

```javascript
module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  rules: {
    'no-console': 'error',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'prefer-const': 'error'
  }
};
```

---

## Commit Convention

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Code restructure |
| `test` | Tests |
| `chore` | Maintenance |

### Examples

```bash
feat(auth): add Google OAuth integration
fix(dashboard): resolve chart rendering issue
docs(readme): update installation guide
refactor(api): optimize database queries
```

---

## File Organization

### Component Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI elements
│   │   ├── button-primary.tsx
│   │   └── input-text.tsx
│   ├── molecules/       # Component combinations
│   │   └── card-user.tsx
│   ├── organisms/       # Complex sections
│   │   └── header-main.tsx
│   └── templates/       # Page layouts
│       └── layout-dashboard.tsx
├── hooks/               # Custom hooks
│   └── useAuth.ts
├── lib/                 # Utilities
│   └── utils.ts
├── types/               # TypeScript types
│   └── index.ts
└── app/                 # Next.js App Router
    └── page.tsx
```

---

## Component Template

```tsx
/**
 * [Component Name]
 * Türkçe: [Açıklama]
 * English: [Description]
 */

import { FC, memo } from 'react';

interface ComponentProps {
  /** Property description / Özellik açıklaması */
  propName: string;
}

export const ComponentName: FC<ComponentProps> = memo(({ propName }) => {
  return (
    <div className="glass p-4">
      {/* Content */}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
```

---

## Import Order

```typescript
// 1. React/Next imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { z } from 'zod';

// 3. Internal components
import { Button } from '@/components/atoms/button-primary';

// 4. Types/Interfaces
import type { UserProps } from '@/types';

// 5. Styles (if needed)
import styles from './styles.module.css';
```

---

## Forbidden Patterns

| Pattern | Issue | Alternative |
|---------|-------|-------------|
| `any` type | No type safety | Proper typing |
| `console.log` | Debug pollution | Logger service |
| Magic numbers | Unclear purpose | Named constants |
| Nested ternaries | Hard to read | if/else or switch |
| Hardcoded strings | Not maintainable | Constants file |
