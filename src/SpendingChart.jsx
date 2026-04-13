import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#f0b429', '#34d399', '#60a5fa', '#f87171', '#a78bfa', '#fb923c', '#2dd4bf'];

function SpendingChart({ transactions, categories }) {
  const data = categories
    .map(cat => ({
      name: cat,
      amount: transactions
        .filter(t => t.type === 'expense' && t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0),
    }))
    .filter(d => d.amount > 0);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="name" tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)} tick={{ fill: '#7a8ba8', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
          <YAxis tick={{ fill: '#4a5a74', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value) => `$${value}`} contentStyle={{ background: '#1a2540', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, color: '#e8ecf4', fontFamily: 'Sora' }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
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
