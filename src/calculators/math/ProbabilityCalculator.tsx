import { useState } from 'react';
import { combinations, permutations } from 'mathjs';

export default function ProbabilityCalculator() {
  const [n, setN] = useState('10');
  const [r, setR] = useState('3');
  const [probEvents, setProbEvents] = useState('1');
  const [probTotal, setProbTotal] = useState('6');

  const nVal = parseInt(n) || 0;
  const rVal = parseInt(r) || 0;
  const evVal = parseFloat(probEvents) || 0;
  const totVal = parseFloat(probTotal) || 1;

  let nCr = 0, nPr = 0;
  let isValidComb = nVal >= 0 && rVal >= 0 && nVal >= rVal;

  if (isValidComb) {
    try {
      nCr = Number(combinations(nVal, rVal));
      nPr = Number(permutations(nVal, rVal));
    } catch {
      isValidComb = false;
    }
  }

  const singleProb = totVal > 0 ? (evVal / totVal) : 0;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🎲</span>
        <div>
          <div className="calc-page-title">Probability & Combinatorics</div>
          <div className="calc-page-desc">Combinations nCr, Permutations nPr, and single-event probability</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <h4 style={{ marginBottom: 14, color: 'var(--electric-blue)' }}>Combinations & Permutations</h4>
        <div className="form-grid form-grid-2" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Total Items (n)</label>
            <input className="form-input" type="number" min="0" value={n} onChange={e => setN(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Chosen Items (r)</label>
            <input className="form-input" type="number" min="0" value={r} onChange={e => setR(e.target.value)} />
          </div>
        </div>

        {isValidComb ? (
          <div className="form-grid form-grid-2" style={{ marginBottom: 24 }}>
            <div className="result-card" style={{ marginTop: 0 }}>
              <div className="result-label">Combinations C({nVal}, {rVal})</div>
              <div className="result-main" style={{ fontSize: '1.6rem' }}>{nCr.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Order does NOT matter</div>
            </div>
            <div className="result-card" style={{ marginTop: 0 }}>
              <div className="result-label">Permutations P({nVal}, {rVal})</div>
              <div className="result-main" style={{ fontSize: '1.6rem' }}>{nPr.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Order DOES matter</div>
            </div>
          </div>
        ) : (
          <div className="warning-box" style={{ marginBottom: 24 }}>n must be ≥ r and both must be non-negative integers.</div>
        )}

        <hr style={{ borderColor: 'var(--border-color)', margin: '20px 0' }} />

        <h4 style={{ marginBottom: 14, color: 'var(--electric-blue)' }}>Single Event Probability</h4>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label className="form-label">Favorable Outcomes</label>
            <input className="form-input" type="number" min="0" value={probEvents} onChange={e => setProbEvents(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Total Outcomes</label>
            <input className="form-input" type="number" min="1" value={probTotal} onChange={e => setProbTotal(e.target.value)} />
          </div>
        </div>

        <div className="result-card" style={{ marginTop: 16 }}>
          <div className="result-label">Probability P(A)</div>
          <div className="result-main">{(singleProb * 100).toFixed(2)}%</div>
          <div className="result-row">
            <span className="result-row-label">Decimal</span>
            <span className="result-row-value">{singleProb.toFixed(6)}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Odds Against</span>
            <span className="result-row-value">{totVal - evVal} : {evVal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
