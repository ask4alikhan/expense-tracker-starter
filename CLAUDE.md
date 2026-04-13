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

React SPA with no routing and no backend. Data lives in React state only and resets on page reload.

**Component structure:**

- `App` — holds the `transactions` array state and the `categories` constant. Passes data down; the only component that calls `setTransactions`.
- `Summary` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally.
- `TransactionForm` — owns its own form field state (description, amount, type, category). Calls `onAdd(transaction)` with a fully-formed transaction object on submit.
- `TransactionList` — owns its own filter state (type, category). Receives `transactions` and `categories` as props.

**Known intentional issue in the starter code:**
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"` — logically inconsistent
- UI is intentionally rough for course exercises
