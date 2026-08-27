import { useState } from 'react';
import nerdamer from 'nerdamer';
import 'nerdamer/Calculus';

export default function IntegralCalculator() {
  const [expression, setExpression] = useState('x^2');
  const [variable, setVariable] = useState('x');

  let result = '';
  let error = '';

  try {
    const integ = nerdamer(`integrate(${expression}, ${variable})`);
    result = integ.text() + ' + C';
  } catch {
    error = 'Could not calculate indefinite integral. Check function syntax.';
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">∫</span>
        <div>
          <div className="calc-page-title">Integral Calculator</div>
          <div className="calc-page-desc">Symbolic integration of functions with constant of integration</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Integrand f(x)</label>
            <input
              className="form-input"
              value={expression}
              onChange={e => setExpression(e.target.value)}
              placeholder="e.g. x^2 + 3*x"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Integration Variable</label>
            <input className="form-input" value={variable} onChange={e => setVariable(e.target.value)} />
          </div>
        </div>

        <div className="chip-group" style={{ marginBottom: 20 }}>
          {['x^2', '3*x^2 - 4*x', 'sin(x)', 'cos(x)', '1/x'].map(exp => (
            <button key={exp} className={`chip${expression === exp ? ' active' : ''}`} onClick={() => setExpression(exp)}>{exp}</button>
          ))}
        </div>

        {error ? (
          <div className="warning-box">{error}</div>
        ) : (
          <div className="result-card">
            <div className="result-label">Indefinite Integral ∫ f({variable}) d{variable}</div>
            <div className="result-main" style={{ fontSize: '1.6rem' }}>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
