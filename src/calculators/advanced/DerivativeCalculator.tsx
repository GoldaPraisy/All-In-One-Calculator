import React, { useState } from 'react';
import nerdamer from 'nerdamer';
import 'nerdamer/Calculus';

export default function DerivativeCalculator() {
  const [expression, setExpression] = useState('x^3 + 2*x^2 - 5*x + 7');
  const [variable, setVariable] = useState('x');

  let result = '';
  let error = '';

  try {
    const diff = nerdamer(`diff(${expression}, ${variable})`);
    result = diff.text();
  } catch (err: any) {
    error = 'Could not calculate derivative. Please check expression syntax.';
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">d/dx</span>
        <div>
          <div className="calc-page-title">Derivative Calculator</div>
          <div className="calc-page-desc">Symbolic differentiation of functions (polynomials, trig, exponential, logs)</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Function f(x)</label>
            <input
              className="form-input"
              value={expression}
              onChange={e => setExpression(e.target.value)}
              placeholder="e.g. x^2 * sin(x)"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Differentiation Variable</label>
            <input className="form-input" value={variable} onChange={e => setVariable(e.target.value)} />
          </div>
        </div>

        <div className="chip-group" style={{ marginBottom: 20 }}>
          {['x^2', 'x^3 - 3*x', 'sin(x)', 'cos(x)', 'exp(x)', 'log(x)'].map(exp => (
            <button key={exp} className={`chip${expression === exp ? ' active' : ''}`} onClick={() => setExpression(exp)}>{exp}</button>
          ))}
        </div>

        {error ? (
          <div className="warning-box">{error}</div>
        ) : (
          <div className="result-card">
            <div className="result-label">Derivative d/d{variable} [{expression}]</div>
            <div className="result-main" style={{ fontSize: '1.6rem' }}>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
