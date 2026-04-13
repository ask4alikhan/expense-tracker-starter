import { useMemo } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#f0b429', '#34d399', '#60a5fa', '#f87171', '#a78bfa', '#fb923c', '#2dd4bf'];

const cssVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function SpendingChart({ transactions, categories }) {
  const data = useMemo(
    () => categories
      .map(cat => ({
        name: cat,
        amount: transactions
          .filter(t => t.type === 'expense' && t.category === cat)
          .reduce((sum, t) => sum + t.amount, 0),
      }))
      .filter(d => d.amount > 0),
    [transactions, categories]
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={cssVar('--border')} />
          <XAxis dataKey="name" tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)} tick={{ fill: cssVar('--text-secondary'), fontSize: 12 }} axisLine={{ stroke: cssVar('--border') }} tickLine={false} />
          <YAxis tick={{ fill: cssVar('--text-muted'), fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} contentStyle={{ background: cssVar('--bg-elevated'), border: `1px solid ${cssVar('--border')}`, borderRadius: 8, color: cssVar('--text-primary'), fontFamily: 'Sora' }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
