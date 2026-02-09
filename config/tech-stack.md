# 🛠️ Tech Stack Configuration

> Official technology standards for all projects.

---

## Frontend Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 14.x (App Router) |
| UI Library | React | 18.x |
| Styling | TailwindCSS | 3.x |
| Design System | Chakra UI | 2.x |
| State Management | Zustand / React Context | Latest |
| Data Fetching | SWR / React Query | Latest |

---

## Backend Stack

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js | 20.x LTS |
| API | Next.js API Routes | 14.x |
| Database | Supabase / Firebase | Latest |
| ORM | Prisma | Latest |
| Auth | NextAuth.js / Supabase Auth | Latest |

---

## AI/ML Stack

| Category | Technology | Version |
|----------|------------|---------|
| Language | Python | 3.11+ |
| Framework | LangChain | Latest |
| Vector DB | Pinecone / Supabase pgvector | Latest |
| LLM | OpenAI / Anthropic | Latest |

---

## DevOps & Tooling

| Category | Technology |
|----------|------------|
| Hosting | Vercel |
| Container | Docker |
| CI/CD | GitHub Actions |
| Monitoring | Vercel Analytics |
| Error Tracking | Sentry |

---

## Design Standards

### Color Palette

```css
:root {
  --primary: #2D709E;
  --primary-dark: #1e4d6b;
  --primary-light: #5a9bc8;
  --background: #0a0a0a;
  --surface: rgba(255, 255, 255, 0.05);
  --text: #ffffff;
  --text-muted: #a0a0a0;
}
```

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

---

## Package Standards

### Required Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "@chakra-ui/react": "^2.0.0",
    "zod": "^3.0.0",
    "zustand": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```
