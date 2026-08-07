import React, { useState } from 'react';
import { simplify, evaluate } from 'mathjs';

export default function AlgebraCalculator() {
  const [expr, setExpr] = useState('2*x + 3*x - 5');
  const [variableVal, setVariableVal] = useState('4');

  let simplified = '';
  let evaluated = '';
  let error = '';

  try {
    simplified = simplify(expr).toString();
  } catch (err: any) {
    error = 'Could not simplify expression. Check syntax.';
  }

  try {
    const val = parseFloat(variableVal);
    if (!isNaN(val)) {
      const res = evaluate(expr, { x: val });
      evaluated = String(res);
    }
  } catch {
    // optional evaluation fails if multiple variables
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🔣</span>
        <div>
          <div className="calc-page-title">Algebra Expression Calculator</div>
          <div className="calc-page-desc">Simplify algebraic expressions and evaluate polynomials for x</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 580, margin: '0 auto' }}>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label className="form-label">Algebraic Expression</label>
          <input
            className="form-input"
            value={expr}
            onChange={e => setExpr(e.target.value)}
            placeholder="e.g. (x + 2)*(x - 3)"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Evaluate when x =</label>
          <input
            className="form-input"
            type="number"
            value={variableVal}
            onChange={e => setVariableVal(e.target.value)}
          />
        </div>

        {error ? (
          <div className="warning-box">{error}</div>
        ) : (
          <div>
            <div className="result-card" style={{ marginTop: 0, marginBottom: 14 }}>
              <div className="result-label">Simplified Expression</div>
              <div className="result-main" style={{ fontSize: '1.6rem' }}>{simplified || expr}</div>
            </div>

            {evaluated && (
              <div className="result-card" style={{ marginTop: 0 }}>
                <div className="result-label">Value at x = {variableVal}</div>
                <div className="result-main" style={{ fontSize: '1.8rem' }}>{evaluated}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
