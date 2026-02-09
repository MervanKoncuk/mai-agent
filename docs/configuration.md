# ⚙️ Configuration

MAI Agents is highly configurable via the `MAI_MEMORY.md` file and `config/` directory.

## MAI_MEMORY.md
This file is the "brain" of your agency. You can manually edit specific sections to change behavior.

### 1. Default Language
Controls the language agents speak validation.
```markdown
**Default Language:** TR (Turkish)
```
*Options: TR, EN, ES, DE, FR...*

### 2. Project Scale
Adjusts the complexity of the output.
```markdown
**Scale:** Startup
```
- **Startup:** Fast, MVP-focused, minimal docs.
- **Enterprise:** Strict, ISO-standard, full documentation.

### 3. Primary Color (Branding)
Controls the design system output.
```markdown
**Primary Color:** #3B82F6
```
*Note: If removed, the Developer Agent will attempt to auto-detect this from your `tailwind.config.ts`.*

## Advanced Config (`config/`)

- **`coding-standards.md`**: Define linting rules, naming conventions, and file structures.
- **`tech-stack.md`**: Define allowed libraries and frameworks.
