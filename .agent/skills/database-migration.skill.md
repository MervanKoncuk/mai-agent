
# 🛠️ Skill: Database Migration & Schema Management
**Primary Agent:** [DATA]
**Secondary Agents:** [DEV], [ARCHITECT]

---

## 1. Zero-Downtime Migrations
**Rule:** Never break code that is currently running in production.

**Pattern (The Expand-Contract Strategy):**
1.  **Expand:** Add the new column/table. Code still writes to old column (and optionally new one).
2.  **Migrate:** Backfill data from old column to new column.
3.  **Switch:** Update code to read/write *only* to the new column.
4.  **Contract:** Delete the old column (after verifying backup).

## 2. Naming Conventions (SQL)
- **Tables:** Plural, snake_case (`users`, `order_items`).
- **Primary Keys:** `id` (UUIDv4 or BigInt).
- **Foreign Keys:** `user_id` (Singular table name + `_id`).
- **Indices:** `idx_tablename_columnname`.

## 3. Indexing Strategy
- **B-Tree:** Default. Good for equality (`=`) and ranges (`<`, `>`).
- **GIN:** For JSONB columns and Full-Text Search.
- **Composite Index:** Order matters! `(status, created_at)` is different from `(created_at, status)`.

## 4. Safety Checks
- **Transactions:** Always wrap migrations in a transaction (`BEGIN; ... COMMIT;`).
- **Locks:** Avoid operations that lock the whole table for long periods (e.g., adding a default value to an existing huge column in Postgres < 11).
- **Backups:** Perform a snapshot *before* running production migrations.

## 5. Data Integrity
- **NOT NULL:** Default to this. Nulls are ambiguous.
- **Foreign Key Constraints:** Always enforce referential integrity.
- **Check Constraints:** `CHECK (price >= 0)`.
