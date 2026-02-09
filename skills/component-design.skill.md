
# 🛠️ Skill: Modern Component Architecture (React/Next.js)
**Primary Agent:** [DEV]
**Secondary Agents:** [QA], [CDO]

---

## 1. The Compound Component Pattern
Use this for complex UI elements like Accordions, Tabs, or Dropdowns to avoid prop drilling.

```tsx
// Usage
<Card>
  <Card.Header title="Profile" />
  <Card.Body>Content</Card.Body>
  <Card.Footer>
    <Button>Save</Button>
  </Card.Footer>
</Card>
```

**Implementation:** Use `React.createContext` to share state between sub-components.

## 2. Custom Hooks Separation (Logic vs UI)
Never mix complex business logic with UI rendering. Extract logic to a hook.

**Bad:**
```tsx
const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetch('/api/users')... }, []); // Logic in UI
  if (loading) return <Spinner />;
  return <ul>...</ul>;
}
```

**Good:**
```tsx
const UserList = () => {
  const { users, isLoading, error } = useUsers(); // Logic abstracted
  
  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner error={error} />;
  return <UserListView users={users} />;
}
```

## 3. Strict Prop Types
Even with TypeScript, define explicit interfaces.
- Avoid `any`.
- Mark optional props clearly (`?`).
- Use `Pick<User, 'id' | 'name'>` instead of passing full objects if unnecessary.

## 4. Performance Optimization (Memoization)
- **Rule:** Only memoize if the component renders defined "heavy" content or is a pure component re-rendering often without prop changes.
- **Tools:** `React.memo`, `useMemo` (for expensive calculations), `useCallback` (for stable function references).

## 5. Accessibility (A11y) First
- **Semantic HTML:** Use `<button>`, not `<div onClick>`.
- **Keyboard Nav:** Ensure `onKeyDown` is handled for interactive elements.
- **ARIA:** Use `aria-label` only when visible text is insufficient.
- **Focus:** Manage focus states (`video:focus-visible`).
