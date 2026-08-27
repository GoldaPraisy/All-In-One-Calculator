import { useState } from 'react';

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('6.5');
  const [time, setTime] = useState('3');

  const P = parseFloat(principal) || 0;
  const R = parseFloat(rate) || 0;
  const T = parseFloat(time) || 0;

  const interest = (P * R * T) / 100;
  const totalAmount = P + interest;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">📋</span>
        <div>
          <div className="calc-page-title">Simple Interest Calculator</div>
          <div className="calc-page-desc">Calculate simple interest and maturity value using Principal, Rate, and Time (P × R × T / 100)</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 550, margin: '0 auto' }}>
        <div className="form-grid form-grid-3" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Principal ($ / ₹)</label>
            <input className="form-input" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Annual Rate (%)</label>
            <input className="form-input" type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Time (Years)</label>
            <input className="form-input" type="number" step="0.5" value={time} onChange={e => setTime(e.target.value)} />
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">Total Amount (Principal + Interest)</div>
          <div className="result-main">{Math.round(totalAmount).toLocaleString()}</div>
          <div className="result-row">
            <span className="result-row-label">Principal</span>
            <span className="result-row-value">{P.toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Total Simple Interest</span>
            <span className="result-row-value highlight">{Math.round(interest).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
