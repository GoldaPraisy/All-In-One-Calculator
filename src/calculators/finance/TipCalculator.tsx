import React, { useState } from 'react';

export default function TipCalculator() {
  const [bill, setBill] = useState('85');
  const [tipPct, setTipPct] = useState('15');
  const [people, setPeople] = useState('2');

  const b = parseFloat(bill) || 0;
  const t = parseFloat(tipPct) || 0;
  const p = Math.max(1, parseInt(people) || 1);

  const totalTip = (b * t) / 100;
  const totalBill = b + totalTip;
  const tipPerPerson = totalTip / p;
  const billPerPerson = totalBill / p;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🍽️</span>
        <div>
          <div className="calc-page-title">Tip Calculator</div>
          <div className="calc-page-desc">Calculate tip amount and split bills evenly among friends</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 500, margin: '0 auto' }}>
        <div className="form-grid form-grid-3" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Bill Amount</label>
            <input className="form-input" type="number" value={bill} onChange={e => setBill(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Tip (%)</label>
            <input className="form-input" type="number" value={tipPct} onChange={e => setTipPct(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">People</label>
            <input className="form-input" type="number" min="1" value={people} onChange={e => setPeople(e.target.value)} />
          </div>
        </div>

        <div className="chip-group" style={{ marginBottom: 20 }}>
          {['10', '12', '15', '18', '20'].map(pct => (
            <button key={pct} className={`chip${tipPct === pct ? ' active' : ''}`} onClick={() => setTipPct(pct)}>{pct}% Tip</button>
          ))}
        </div>

        <div className="result-card">
          <div className="result-label">Total Per Person</div>
          <div className="result-main">{billPerPerson.toFixed(2)}</div>
          <div className="result-row">
            <span className="result-row-label">Total Tip ({tipPct}%)</span>
            <span className="result-row-value highlight">{totalTip.toFixed(2)}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Tip Per Person</span>
            <span className="result-row-value">{tipPerPerson.toFixed(2)}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Grand Total</span>
            <span className="result-row-value">{totalBill.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
