import React, { useState } from 'react';
import { add, multiply, det, inv } from 'mathjs';

export default function MatrixCalculator() {
  const [size, setSize] = useState<2 | 3>(2);
  const [op, setOp] = useState<'add' | 'multiply' | 'det' | 'inv'>('add');

  const [mA, setMA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [mB, setMB] = useState<number[][]>([[5, 6], [7, 8]]);

  const updateCellA = (r: number, c: number, v: string) => {
    const next = mA.map(row => [...row]);
    next[r][c] = parseFloat(v) || 0;
    setMA(next);
  };

  const updateCellB = (r: number, c: number, v: string) => {
    const next = mB.map(row => [...row]);
    next[r][c] = parseFloat(v) || 0;
    setMB(next);
  };

  const setMatrixDim = (d: 2 | 3) => {
    setSize(d);
    if (d === 2) {
      setMA([[1, 2], [3, 4]]);
      setMB([[5, 6], [7, 8]]);
    } else {
      setMA([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      setMB([[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
    }
  };

  let result: any = null;
  let error = '';

  try {
    if (op === 'add') result = add(mA, mB);
    else if (op === 'multiply') result = multiply(mA, mB);
    else if (op === 'det') result = det(mA);
    else if (op === 'inv') result = inv(mA);
  } catch (err: any) {
    error = 'Operation failed. Matrix might be singular or non-invertible.';
  }

  const renderMatrixInput = (m: number[][], updateFn: Function, label: string) => (
    <div>
      <div className="form-label" style={{ marginBottom: 6 }}>{label}</div>
      <div className="matrix-input">
        {m.map((row, r) => (
          <div key={r} className="matrix-row">
            {row.map((cell, c) => (
              <input
                key={c}
                className="form-input matrix-cell"
                type="number"
                value={cell}
                onChange={e => updateFn(r, c, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🔲</span>
        <div>
          <div className="calc-page-title">Matrix Calculator</div>
          <div className="calc-page-desc">Matrix addition, multiplication, determinant, and inverse for 2×2 and 3×3 matrices</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 650, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div className="chip-group" style={{ marginBottom: 0 }}>
            <button className={`chip${size === 2 ? ' active' : ''}`} onClick={() => setMatrixDim(2)}>2 × 2 Matrix</button>
            <button className={`chip${size === 3 ? ' active' : ''}`} onClick={() => setMatrixDim(3)}>3 × 3 Matrix</button>
          </div>

          <div className="tab-nav" style={{ marginBottom: 0 }}>
            <button className={`tab-btn${op === 'add' ? ' active' : ''}`} onClick={() => setOp('add')}>A + B</button>
            <button className={`tab-btn${op === 'multiply' ? ' active' : ''}`} onClick={() => setOp('multiply')}>A × B</button>
            <button className={`tab-btn${op === 'det' ? ' active' : ''}`} onClick={() => setOp('det')}>det(A)</button>
            <button className={`tab-btn${op === 'inv' ? ' active' : ''}`} onClick={() => setOp('inv')}>A⁻¹ (Inv)</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
          {renderMatrixInput(mA, updateCellA, 'Matrix A')}
          {(op === 'add' || op === 'multiply') && renderMatrixInput(mB, updateCellB, 'Matrix B')}
        </div>

        {error ? (
          <div className="warning-box">{error}</div>
        ) : (
          result !== null && (
            <div className="result-card">
              <div className="result-label">Result Matrix</div>
              {typeof result === 'number' ? (
                <div className="result-main">{result}</div>
              ) : (
                <div className="matrix-input" style={{ display: 'inline-block', margin: '10px 0' }}>
                  {result.map((row: number[], r: number) => (
                    <div key={r} className="matrix-row">
                      {row.map((val: number, c: number) => (
                        <div key={c} className="matrix-cell" style={{ background: 'var(--bg-input)', padding: '8px', borderRadius: '4px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                          {Number(val).toFixed(2).replace(/\.?0+$/, '')}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
