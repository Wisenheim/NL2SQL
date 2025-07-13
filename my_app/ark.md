┌────────────────────┐
│    User Interface  │
│  (Next.js + React) │
└────────┬───────────┘
         │
         ▼
[1] Natural Language Input
         │
         ▼
┌────────────────────────────────────────────┐
│  /api/chat (Ollama - LLaMA 3)              │
│  → Uses SQL_SCHEMA as context              │
│  → Returns raw SQL string                  │
└────────┬───────────────────────────────────┘
         │
         ▼
[2] SQL Query (e.g., SELECT * FROM users;)
         │
         ▼
┌────────────────────────────────────────────┐
│  /api/sql (Next.js API Route)              │
│  → Sequelize connects to Postgres          │
│  → Executes generated SQL                  │
└────────┬───────────────────────────────────┘
         │
         ▼
[3] Query Results
         │
         ▼
┌───────────────────────┐
│   React Frontend      │
│  → Syntax highlight   │
│  → Display results    │
└───────────────────────┘



