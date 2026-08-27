import { useState } from 'react';
import nerdamer from 'nerdamer';
import 'nerdamer/Solve';

export default function EquationSolver() {
  const [eq, setEq] = useState('x^2 - 5*x + 6 = 0');
  const [variable, setVariable] = useState('x');

  let solutions: string[] = [];
  let error = '';

  try {
    const sol = (nerdamer as any).solve(eq, variable);
    const text = sol.text();
    // parse solution array format like "[2,3]"
    if (text.startsWith('[') && text.endsWith(']')) {
      solutions = text.slice(1, -1).split(',').map((s: string) => s.trim());
    } else {
      solutions = [text];
    }
  } catch {
    error = 'Could not solve equation. Ensure equation includes = sign or equals 0.';
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🔍</span>
        <div>
          <div className="calc-page-title">Equation Solver</div>
          <div className="calc-page-desc">Solve linear, quadratic, polynomial, and algebraic equations for x</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label className="form-label">Equation (with = sign)</label>
          <input
            className="form-input"
            value={eq}
            onChange={e => setEq(e.target.value)}
            placeholder="e.g. 2*x + 5 = 15 or x^2 - 4 = 0"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Solve For Variable</label>
          <input className="form-input" value={variable} onChange={e => setVariable(e.target.value)} />
        </div>

        {error ? (
          <div className="warning-box">{error}</div>
        ) : (
          <div className="result-card">
            <div className="result-label">Solutions for {variable}</div>
            <div className="result-main" style={{ fontSize: '1.6rem' }}>
              {solutions.length > 0 ? solutions.join(' ,  ') : 'No real solutions found'}
            </div>
            {solutions.map((sol, i) => (
              <div key={i} className="result-row">
                <span className="result-row-label">Root {i + 1}</span>
                <span className="result-row-value">{sol}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
