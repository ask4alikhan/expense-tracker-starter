# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run ESLint
```

There is no test suite.

## Architecture

React 19 SPA built with Vite 7. No routing, no backend. Only runtime dependency beyond React is recharts (for charts). Data lives in React state only and resets on page reload.

**File structure:** All source files live flat in `src/` (no subdirectories).

- `main.jsx` — entry point, renders `<App />` inside `<StrictMode>`
- `App.jsx` — root component
- `Summary.jsx`, `SpendingChart.jsx`, `TransactionForm.jsx`, `TransactionList.jsx`, `ConfirmDialog.jsx` — components
- `index.css` — CSS custom properties (design tokens), reset, and body styles; `App.css` — component styles (no CSS modules or CSS-in-JS)

**Data model:**

A transaction is `{ id, description, amount, type, category, date }`.

- `id` — generated via `Date.now()`
- `type` — `"income"` or `"expense"`
- `category` — one of the `categories` array defined as a module-level constant in `App.jsx`: food, housing, utilities, transport, entertainment, salary, other
- `date` — ISO date string (`YYYY-MM-DD`)

**Component structure:**

- `App` — holds the `transactions` array state and the `categories` constant. Passes data and callbacks (`onAdd`, `onDelete`) down; the only component that calls `setTransactions`.
- `Summary` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally.
- `SpendingChart` — receives `transactions` and `categories`, aggregates expenses by category, renders a recharts `BarChart` with per-category coloring. Hidden when there are no expenses.
- `TransactionForm` — owns its own form field state (description, amount, type, category). Calls `onAdd(transaction)` with a fully-formed transaction object on submit.
- `TransactionList` — owns its own filter state (`filterType`, `filterCategory`) and delete confirmation state (`deleteId`). Receives `transactions`, `categories`, and `onDelete` as props. Renders `ConfirmDialog` when a delete is pending.
- `ConfirmDialog` — generic modal overlay with backdrop dismiss. Receives `message`, `onConfirm`, `onCancel` props.

**Styling:** Dark theme using CSS custom properties defined in `index.css` (e.g. `--bg-surface`, `--text-primary`, `--accent`, `--income`, `--expense`). Fonts loaded from Google Fonts: Fraunces (display/amounts) and Sora (body). New components should use existing CSS variables rather than hardcoding colors.

**Known intentional issue in the starter code:**
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"` — logically inconsistent
