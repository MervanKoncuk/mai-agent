# ⚖️ MAI Protocols & Core Principles

> Fundamental rules that govern all development activities.

---

## 🏗️ Architecture Principles

### 1. Clean Architecture
```
UI → Application → Domain → Infrastructure
     Each layer depends only inward
```

### 2. SOLID Principles
- **S**ingle Responsibility - One reason to change
- **O**pen/Closed - Open for extension, closed for modification
- **L**iskov Substitution - Subtypes must be substitutable
- **I**nterface Segregation - Many specific interfaces
- **D**ependency Inversion - Depend on abstractions

### 3. Modular Design
- **NEVER** monolithic code
- Each feature = independent module
- Micro-service mindset

---

## 💻 Coding Standards

### TypeScript/React

```typescript
// ✅ DO: Strict typing
interface UserProps {
  id: string;
  name: string;
  role: 'admin' | 'user';
}

// ❌ DON'T: Use 'any'
const data: any = fetchData(); // FORBIDDEN
```

### Component Pattern

```tsx
// ✅ Functional Components + Hooks
export const Component: React.FC<Props> = ({ prop }) => {
  const [state, setState] = useState();
  
  // Handlers
  const handleAction = useCallback(() => {}, []);
  
  // Render
  return <div>{/* ... */}</div>;
};
```

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `user-profile-card.tsx` |
| Hooks | camelCase with 'use' | `useAuth.ts` |
| Utils | kebab-case | `date-formatter.ts` |
| Types | PascalCase | `UserTypes.ts` |

---

## 📝 Documentation

### Bilingual Comments (TR/EN)

```typescript
/**
 * Kullanıcı kimlik doğrulaması yapar.
 * Authenticates the user with provided credentials.
 * 
 * @param email - Kullanıcı e-postası / User email
 * @param password - Şifre / Password
 * @returns Oturum tokeni / Session token
 */
```

---

## 🛡️ Error Handling

### Error Boundaries Required

```tsx
// Every major section needs ErrorBoundary
<ErrorBoundary fallback={<ErrorFallback />}>
  <FeatureModule />
</ErrorBoundary>
```

### Graceful Degradation

```typescript
try {
  await riskyOperation();
} catch (error) {
  logger.error('Operation failed', error);
  showUserFriendlyMessage();
  // Never crash the entire app
}
```

---

## 🔐 Security Principles

1. **Input Validation** - Never trust user input
2. **Output Encoding** - Prevent XSS
3. **Rate Limiting** - Prevent abuse
4. **Least Privilege** - Minimal permissions
5. **Secure Defaults** - Secure out of the box

---

## 🚫 Absolute Rules

| Rule | Consequence |
|------|-------------|
| No `any` types | PR rejected |
| No console.log in production | PR rejected |
| No hardcoded secrets | Immediate fix required |
| No monolithic files (>300 lines) | Must refactor |
