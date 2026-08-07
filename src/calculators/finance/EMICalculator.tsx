import React, { useState } from 'react';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('500000');
  const [rate, setRate] = useState('8.5');
  const [tenureYears, setTenureYears] = useState('5');

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 12 / 100;
  const n = (parseFloat(tenureYears) || 0) * 12;

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (P > 0 && r > 0 && n > 0) {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayment = emi * n;
    totalInterest = totalPayment - P;
  }

  // Generate schedule summary
  const schedule = [];
  let balance = P;
  if (P > 0 && r > 0 && n > 0 && n <= 360) {
    for (let month = 1; month <= n; month++) {
      const interestMonth = balance * r;
      const principalMonth = emi - interestMonth;
      balance = Math.max(0, balance - principalMonth);
      schedule.push({
        month,
        principal: principalMonth,
        interest: interestMonth,
        balance,
      });
    }
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🏦</span>
        <div>
          <div className="calc-page-title">EMI Calculator</div>
          <div className="calc-page-desc">Calculate Equated Monthly Installments and amortization schedule for loans</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 650, margin: '0 auto' }}>
        <div className="form-grid form-grid-3" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Loan Amount ($ / ₹)</label>
            <input className="form-input" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Interest Rate (% p.a.)</label>
            <input className="form-input" type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Tenure (Years)</label>
            <input className="form-input" type="number" value={tenureYears} onChange={e => setTenureYears(e.target.value)} />
          </div>
        </div>

        {emi > 0 && (
          <div>
            <div className="result-card" style={{ marginBottom: 20 }}>
              <div className="result-label">Monthly EMI</div>
              <div className="result-main">{Math.round(emi).toLocaleString()}</div>
              <div className="result-row">
                <span className="result-row-label">Principal Amount</span>
                <span className="result-row-value">{P.toLocaleString()}</span>
              </div>
              <div className="result-row">
                <span className="result-row-label">Total Interest Payable</span>
                <span className="result-row-value highlight">{Math.round(totalInterest).toLocaleString()}</span>
              </div>
              <div className="result-row">
                <span className="result-row-label">Total Payment (Principal + Interest)</span>
                <span className="result-row-value">{Math.round(totalPayment).toLocaleString()}</span>
              </div>
            </div>

            {schedule.length > 0 && (
              <div>
                <h4 style={{ marginBottom: 10, color: 'var(--text-secondary)' }}>Repayment Schedule (First 12 Months)</h4>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>EMI</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.slice(0, 12).map(row => (
                        <tr key={row.month}>
                          <td>{row.month}</td>
                          <td>{Math.round(emi).toLocaleString()}</td>
                          <td>{Math.round(row.principal).toLocaleString()}</td>
                          <td>{Math.round(row.interest).toLocaleString()}</td>
                          <td>{Math.round(row.balance).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
