import React, { useState } from 'react';

export default function ProgrammerCalculator() {
  const [val, setVal] = useState('42');
  const [base, setBase] = useState<10 | 2 | 16 | 8>(10);

  let dec = 0;
  try {
    dec = parseInt(val, base) || 0;
  } catch {
    dec = 0;
  }

  const binStr = (dec >>> 0).toString(2).padStart(8, '0');
  const hexStr = (dec >>> 0).toString(16).toUpperCase();
  const octStr = (dec >>> 0).toString(8);

  const handleBitwise = (op: 'AND' | 'OR' | 'XOR' | 'NOT' | 'SHL' | 'SHR', operandVal: number = 1) => {
    let res = dec;
    if (op === 'NOT') res = ~dec;
    else if (op === 'SHL') res = dec << operandVal;
    else if (op === 'SHR') res = dec >> operandVal;
    setVal(res.toString(base).toUpperCase());
  };

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">💻</span>
        <div>
          <div className="calc-page-title">Programmer Calculator</div>
          <div className="calc-page-desc">Binary, Decimal, Hexadecimal, Octal conversions and bitwise operations</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 650, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${base === 10 ? ' active' : ''}`} onClick={() => setBase(10)}>DEC (Decimal)</button>
          <button className={`tab-btn${base === 2 ? ' active' : ''}`} onClick={() => setBase(2)}>BIN (Binary)</button>
          <button className={`tab-btn${base === 16 ? ' active' : ''}`} onClick={() => setBase(16)}>HEX (Hexadecimal)</button>
          <button className={`tab-btn${base === 8 ? ' active' : ''}`} onClick={() => setBase(8)}>OCT (Octal)</button>
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Input Number (Base {base})</label>
          <input
            className="form-input"
            value={val}
            onChange={e => setVal(e.target.value)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', textTransform: 'uppercase' }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="prog-display-base">
            <label>HEX:</label>
            <span>{hexStr}</span>
          </div>
          <div className="prog-display-base">
            <label>DEC:</label>
            <span>{dec.toLocaleString()}</span>
          </div>
          <div className="prog-display-base">
            <label>OCT:</label>
            <span>{octStr}</span>
          </div>
          <div className="prog-display-base">
            <label>BIN:</label>
            <span>{binStr}</span>
          </div>
        </div>

        <div className="form-label" style={{ marginBottom: 8 }}>Bitwise Shift Operations</div>
        <div className="chip-group">
          <button className="chip" onClick={() => handleBitwise('NOT')}>NOT (~)</button>
          <button className="chip" onClick={() => handleBitwise('SHL', 1)}>Shift Left (&lt;&lt; 1)</button>
          <button className="chip" onClick={() => handleBitwise('SHR', 1)}>Shift Right (&gt;&gt; 1)</button>
        </div>
      </div>
    </div>
  );
}
