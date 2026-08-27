import { useState } from 'react';

export default function TimeCalculator() {
  const [h1, setH1] = useState('2');
  const [m1, setM1] = useState('45');
  const [s1, setS1] = useState('30');

  const [h2, setH2] = useState('1');
  const [m2, setM2] = useState('30');
  const [s2, setS2] = useState('15');

  const [op, setOp] = useState<'+' | '-'>('+');

  const sec1 = (parseInt(h1) || 0) * 3600 + (parseInt(m1) || 0) * 60 + (parseInt(s1) || 0);
  const sec2 = (parseInt(h2) || 0) * 3600 + (parseInt(m2) || 0) * 60 + (parseInt(s2) || 0);

  const resSec = op === '+' ? sec1 + sec2 : Math.max(0, sec1 - sec2);

  const resH = Math.floor(resSec / 3600);
  const resM = Math.floor((resSec % 3600) / 60);
  const resS = resSec % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">⏱️</span>
        <div>
          <div className="calc-page-title">Time Calculator</div>
          <div className="calc-page-desc">Add or subtract time durations in Hours, Minutes, and Seconds</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 580, margin: '0 auto' }}>
        <h4 style={{ marginBottom: 10, color: 'var(--text-secondary)' }}>First Duration</h4>
        <div className="form-grid form-grid-3" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Hours</label>
            <input className="form-input" type="number" min="0" value={h1} onChange={e => setH1(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Minutes</label>
            <input className="form-input" type="number" min="0" max="59" value={m1} onChange={e => setM1(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Seconds</label>
            <input className="form-input" type="number" min="0" max="59" value={s1} onChange={e => setS1(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div className="tab-nav">
            <button className={`tab-btn${op === '+' ? ' active' : ''}`} onClick={() => setOp('+')}>Add (+)</button>
            <button className={`tab-btn${op === '-' ? ' active' : ''}`} onClick={() => setOp('-')}>Subtract (-)</button>
          </div>
        </div>

        <h4 style={{ marginBottom: 10, color: 'var(--text-secondary)' }}>Second Duration</h4>
        <div className="form-grid form-grid-3" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Hours</label>
            <input className="form-input" type="number" min="0" value={h2} onChange={e => setH2(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Minutes</label>
            <input className="form-input" type="number" min="0" max="59" value={m2} onChange={e => setM2(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Seconds</label>
            <input className="form-input" type="number" min="0" max="59" value={s2} onChange={e => setS2(e.target.value)} />
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">Result Duration (HH:MM:SS)</div>
          <div className="result-main">
            {pad(resH)}:{pad(resM)}:{pad(resS)}
          </div>
          <div className="result-row">
            <span className="result-row-label">Total Seconds</span>
            <span className="result-row-value">{resSec.toLocaleString()} seconds</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Total Minutes</span>
            <span className="result-row-value">{(resSec / 60).toFixed(2)} minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
