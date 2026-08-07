import React, { useState } from 'react';

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('200');
  const [rate, setRate] = useState('6');
  const [years, setYears] = useState('10');

  const P = parseFloat(initialDeposit) || 0;
  const PMT = parseFloat(monthlyContribution) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  let futureValue = P;
  let totalDeposited = P + (PMT * n);

  if (n > 0) {
    if (r > 0) {
      futureValue = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
    } else {
      futureValue = P + PMT * n;
    }
  }

  const interestEarned = futureValue - totalDeposited;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🐷</span>
        <div>
          <div className="calc-page-title">Savings & Investment Calculator</div>
          <div className="calc-page-desc">Forecast future savings value with recurring monthly contributions and compound growth</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Initial Deposit ($ / ₹)</label>
            <input className="form-input" type="number" value={initialDeposit} onChange={e => setInitialDeposit(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Monthly Deposit ($ / ₹)</label>
            <input className="form-input" type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Annual Return Rate (%)</label>
            <input className="form-input" type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Time Period (Years)</label>
            <input className="form-input" type="number" value={years} onChange={e => setYears(e.target.value)} />
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">Estimated Future Savings</div>
          <div className="result-main">{Math.round(futureValue).toLocaleString()}</div>
          <div className="result-row">
            <span className="result-row-label">Total Money Deposited</span>
            <span className="result-row-value">{Math.round(totalDeposited).toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Total Compound Interest Earned</span>
            <span className="result-row-value highlight">{Math.round(interestEarned).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
