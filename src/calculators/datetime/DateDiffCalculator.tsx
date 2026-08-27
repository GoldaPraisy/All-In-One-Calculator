import { useState } from 'react';

export default function DateDiffCalculator() {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');

  const start = new Date(startDate);
  const end = new Date(endDate);

  let days = 0, weeks = 0, months = 0, years = 0;
  let isValid = !isNaN(start.getTime()) && !isNaN(end.getTime());

  if (isValid) {
    const diffMs = Math.abs(end.getTime() - start.getTime());
    days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    weeks = Math.floor(days / 7);
    months = Math.floor(days / 30.4375);
    years = Math.floor(days / 365.25);
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">📆</span>
        <div>
          <div className="calc-page-title">Date Difference Calculator</div>
          <div className="calc-page-desc">Calculate number of days, weeks, months, and years between two dates</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 550, margin: '0 auto' }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input className="form-input" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input className="form-input" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
        </div>

        {isValid ? (
          <div>
            <div className="result-card" style={{ marginBottom: 20 }}>
              <div className="result-label">Difference in Days</div>
              <div className="result-main">{days.toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>days</span></div>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time Unit</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Total Days</td><td>{days.toLocaleString()} days</td></tr>
                  <tr><td>Total Weeks</td><td>{weeks.toLocaleString()} weeks + {days % 7} days</td></tr>
                  <tr><td>Total Months</td><td>~{months.toLocaleString()} months</td></tr>
                  <tr><td>Total Years</td><td>~{years.toLocaleString()} years</td></tr>
                  <tr><td>Total Hours</td><td>{(days * 24).toLocaleString()} hours</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="warning-box">Select valid dates.</div>
        )}
      </div>
    </div>
  );
}
