import React, { useState } from 'react';

interface Props {
  base: 2 | 8 | 16;
  title: string;
  icon: string;
}

export default function BaseCalculator({ base, title, icon }: Props) {
  const [num1, setNum1] = useState(base === 2 ? '1010' : base === 8 ? '12' : '0A');
  const [num2, setNum2] = useState(base === 2 ? '0101' : base === 8 ? '05' : '05');
  const [op, setOp] = useState<'+' | '-' | '×' | '÷'>('+');

  const n1 = parseInt(num1, base) || 0;
  const n2 = parseInt(num2, base) || 0;

  let resDec = 0;
  if (op === '+') resDec = n1 + n2;
  else if (op === '-') resDec = n1 - n2;
  else if (op === '×') resDec = n1 * n2;
  else if (op === '÷') resDec = n2 !== 0 ? Math.floor(n1 / n2) : 0;

  const resStr = (resDec >>> 0).toString(base).toUpperCase();

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">{icon}</span>
        <div>
          <div className="calc-page-title">{title}</div>
          <div className="calc-page-desc">Perform base-{base} arithmetic operations (+, -, ×, ÷)</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 550, margin: '0 auto' }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">First Value (Base {base})</label>
            <input
              className="form-input"
              value={num1}
              onChange={e => setNum1(e.target.value)}
              style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Second Value (Base {base})</label>
            <input
              className="form-input"
              value={num2}
              onChange={e => setNum2(e.target.value)}
              style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}
            />
          </div>
        </div>

        <div className="tab-nav" style={{ justifyContent: 'center', marginBottom: 20 }}>
          {(['+', '-', '×', '÷'] as const).map(o => (
            <button key={o} className={`tab-btn${op === o ? ' active' : ''}`} onClick={() => setOp(o)}>{o}</button>
          ))}
        </div>

        <div className="result-card">
          <div className="result-label">Result (Base {base})</div>
          <div className="result-main" style={{ textTransform: 'uppercase' }}>{resStr}</div>
          <div className="result-row">
            <span className="result-row-label">Decimal Equivalent</span>
            <span className="result-row-value">{resDec}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Binary Equivalent</span>
            <span className="result-row-value">{(resDec >>> 0).toString(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
