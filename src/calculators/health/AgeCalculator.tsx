import { useState } from 'react';

export default function AgeCalculator() {
  const [dob, setDob] = useState('2000-01-15');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const birth = new Date(dob);
  const target = new Date(targetDate);

  let years = 0, months = 0, days = 0;
  let totalDays = 0;
  let totalMonths = 0;
  let totalHours = 0;

  if (!isNaN(birth.getTime()) && !isNaN(target.getTime()) && target >= birth) {
    const diffMs = target.getTime() - birth.getTime();
    totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    totalHours = totalDays * 24;

    let y = target.getFullYear() - birth.getFullYear();
    let m = target.getMonth() - birth.getMonth();
    let d = target.getDate() - birth.getDate();

    if (d < 0) {
      m -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      d += prevMonth.getDate();
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }

    years = y;
    months = m;
    days = d;
    totalMonths = y * 12 + m;
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🎂</span>
        <div>
          <div className="calc-page-title">Age Calculator</div>
          <div className="calc-page-desc">Calculate exact age in years, months, days, weeks, and hours from Date of Birth</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 550, margin: '0 auto' }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input className="form-input" type="date" value={dob} onChange={e => setDob(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Age at Date</label>
            <input className="form-input" type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
          </div>
        </div>

        {totalDays > 0 ? (
          <div>
            <div className="result-card" style={{ marginBottom: 20 }}>
              <div className="result-label">Your Age</div>
              <div className="result-main" style={{ fontSize: '1.8rem' }}>
                {years} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>years</span>{' '}
                {months} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>months</span>{' '}
                {days} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>days</span>
              </div>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Total Years</td><td>{years} years</td></tr>
                  <tr><td>Total Months</td><td>{totalMonths.toLocaleString()} months</td></tr>
                  <tr><td>Total Weeks</td><td>{Math.floor(totalDays / 7).toLocaleString()} weeks</td></tr>
                  <tr><td>Total Days</td><td>{totalDays.toLocaleString()} days</td></tr>
                  <tr><td>Total Hours</td><td>{totalHours.toLocaleString()} hours</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="warning-box">Please select a valid birth date prior to target date.</div>
        )}
      </div>
    </div>
  );
}
