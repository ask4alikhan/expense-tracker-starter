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

This is a single-file React app (`src/App.jsx`). All state, logic, and UI live in the `App` component — there are no sub-components, no routing, and no backend. Data is held in React state only; it resets on page reload.

**Known intentional issues in the starter code:**
- Bug: `amount` is stored as a string, so `reduce` concatenates instead of summing (income/expense totals are wrong)
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"` — logically inconsistent
- UI and code quality are intentionally rough for course exercises
