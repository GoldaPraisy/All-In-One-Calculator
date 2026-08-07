import React, { useState } from 'react';

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'what_is' | 'is_what_percent' | 'inc_dec'>('what_is');

  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState('15');
  const [m1Y, setM1Y] = useState('200');

  // Mode 2: X is what % of Y?
  const [m2X, setM2X] = useState('30');
  const [m2Y, setM2Y] = useState('150');

  // Mode 3: Percentage Increase/Decrease from X to Y
  const [m3X, setM3X] = useState('100');
  const [m3Y, setM3Y] = useState('125');

  const getResult = () => {
    if (mode === 'what_is') {
      const x = parseFloat(m1X) || 0;
      const y = parseFloat(m1Y) || 0;
      const res = (x / 100) * y;
      return { title: `${x}% of ${y}`, main: res.toLocaleString('en-US', { maximumFractionDigits: 6 }), desc: `Calculation: (${x} ÷ 100) × ${y}` };
    } else if (mode === 'is_what_percent') {
      const x = parseFloat(m2X) || 0;
      const y = parseFloat(m2Y) || 1;
      const res = (x / y) * 100;
      return { title: `${x} of ${y}`, main: `${res.toFixed(2)}%`, desc: `Calculation: (${x} ÷ ${y}) × 100` };
    } else {
      const x = parseFloat(m3X) || 0;
      const y = parseFloat(m3Y) || 0;
      if (x === 0) return { title: 'Difference', main: 'N/A', desc: 'Original value cannot be 0' };
      const diff = y - x;
      const pct = (diff / x) * 100;
      const type = diff >= 0 ? 'Increase' : 'Decrease';
      return { title: `Percentage ${type}`, main: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`, desc: `Difference: ${diff >= 0 ? '+' : ''}${diff}` };
    }
  };

  const res = getResult();

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">%</span>
        <div>
          <div className="calc-page-title">Percentage Calculator</div>
          <div className="calc-page-desc">Calculate percentages, percentage values, and percentage increases/decreases</div>
        </div>
      </div>
      <div className="calc-card" style={{ maxWidth: 540, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${mode === 'what_is' ? ' active' : ''}`} onClick={() => setMode('what_is')}>What is X% of Y?</button>
          <button className={`tab-btn${mode === 'is_what_percent' ? ' active' : ''}`} onClick={() => setMode('is_what_percent')}>X is what % of Y?</button>
          <button className={`tab-btn${mode === 'inc_dec' ? ' active' : ''}`} onClick={() => setMode('inc_dec')}>% Increase / Decrease</button>
        </div>

        {mode === 'what_is' && (
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Percentage (X %)</label>
              <input className="form-input" type="number" value={m1X} onChange={e => setM1X(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Total Value (Y)</label>
              <input className="form-input" type="number" value={m1Y} onChange={e => setM1Y(e.target.value)} />
            </div>
          </div>
        )}

        {mode === 'is_what_percent' && (
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Part Value (X)</label>
              <input className="form-input" type="number" value={m2X} onChange={e => setM2X(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Total Value (Y)</label>
              <input className="form-input" type="number" value={m2Y} onChange={e => setM2Y(e.target.value)} />
            </div>
          </div>
        )}

        {mode === 'inc_dec' && (
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Original Value (X)</label>
              <input className="form-input" type="number" value={m3X} onChange={e => setM3X(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">New Value (Y)</label>
              <input className="form-input" type="number" value={m3Y} onChange={e => setM3Y(e.target.value)} />
            </div>
          </div>
        )}

        <div className="result-card">
          <div className="result-label">{res.title}</div>
          <div className="result-main">{res.main}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{res.desc}</div>
        </div>
      </div>
    </div>
  );
}
