import React, { useState } from 'react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('7');
  const [time, setTime] = useState('5');
  const [freq, setFreq] = useState('1'); // 1=Yearly, 4=Quarterly, 12=Monthly, 365=Daily

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(time) || 0;
  const n = parseInt(freq) || 1;

  const amount = P * Math.pow(1 + r / n, n * t);
  const interest = amount - P;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">📈</span>
        <div>
          <div className="calc-page-title">Compound Interest Calculator</div>
          <div className="calc-page-desc">Calculate compound interest with annual, semi-annual, quarterly, monthly, or daily compounding</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Initial Principal ($ / ₹)</label>
            <input className="form-input" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Interest Rate (% p.a.)</label>
            <input className="form-input" type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Time Period (Years)</label>
            <input className="form-input" type="number" value={time} onChange={e => setTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Compounding Frequency</label>
            <select className="form-select" value={freq} onChange={e => setFreq(e.target.value)}>
              <option value="1">Annually (1/yr)</option>
              <option value="2">Semi-Annually (2/yr)</option>
              <option value="4">Quarterly (4/yr)</option>
              <option value="12">Monthly (12/yr)</option>
              <option value="365">Daily (365/yr)</option>
            </select>
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">Future Value</div>
          <div className="result-main">{Math.round(amount).toLocaleString()}</div>
          <div className="result-row">
            <span className="result-row-label">Initial Principal</span>
            <span className="result-row-value">{P.toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Total Interest Earned</span>
            <span className="result-row-value highlight">{Math.round(interest).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
