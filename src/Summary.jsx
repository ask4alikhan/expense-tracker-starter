import { useMemo } from 'react'

function Summary({ transactions }) {
  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Income</h3>
        <p className="income-amount">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses</h3>
        <p className="expense-amount">${totalExpenses.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Balance</h3>
        <p className={`balance-amount ${balance < 0 ? 'balance-negative' : ''}`}>${balance.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Summary;
