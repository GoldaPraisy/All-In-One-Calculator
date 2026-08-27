import { useState } from 'react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('250000');
  const [interestRate, setInterestRate] = useState('7.2');
  const [termYears, setTermYears] = useState('15');

  const P = parseFloat(loanAmount) || 0;
  const r = (parseFloat(interestRate) || 0) / 12 / 100;
  const n = (parseFloat(termYears) || 0) * 12;

  let monthlyPayment = 0;
  let totalCost = 0;
  let totalInterest = 0;

  if (P > 0 && r > 0 && n > 0) {
    monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalCost = monthlyPayment * n;
    totalInterest = totalCost - P;
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">💳</span>
        <div>
          <div className="calc-page-title">Loan Cost & Interest Breakdown</div>
          <div className="calc-page-desc">Comprehensive loan analysis with principal vs interest ratio</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="form-grid form-grid-3" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Principal Loan</label>
            <input className="form-input" type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Interest Rate (% p.a.)</label>
            <input className="form-input" type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Term (Years)</label>
            <input className="form-input" type="number" value={termYears} onChange={e => setTermYears(e.target.value)} />
          </div>
        </div>

        {monthlyPayment > 0 && (
          <div className="result-card">
            <div className="result-label">Monthly Payment</div>
            <div className="result-main">{Math.round(monthlyPayment).toLocaleString()}</div>
            <div className="result-row">
              <span className="result-row-label">Original Principal</span>
              <span className="result-row-value">{P.toLocaleString()}</span>
            </div>
            <div className="result-row">
              <span className="result-row-label">Total Interest Paid</span>
              <span className="result-row-value highlight">{Math.round(totalInterest).toLocaleString()}</span>
            </div>
            <div className="result-row">
              <span className="result-row-label">Interest to Loan Ratio</span>
              <span className="result-row-value">{((totalInterest / P) * 100).toFixed(1)}%</span>
            </div>
            <div className="result-row">
              <span className="result-row-label">Total Amount Paid</span>
              <span className="result-row-value">{Math.round(totalCost).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
