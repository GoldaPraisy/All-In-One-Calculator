import React, { useState } from 'react';

export default function ElectricalCalculator() {
  const [solveFor, setSolveFor] = useState<'v' | 'i' | 'r' | 'p'>('v');

  const [voltage, setVoltage] = useState('220');
  const [current, setCurrent] = useState('10');
  const [resistance, setResistance] = useState('22');
  const [power, setPower] = useState('2200');

  const v = parseFloat(voltage) || 0;
  const i = parseFloat(current) || 0;
  const r = parseFloat(resistance) || 0;
  const p = parseFloat(power) || 0;

  let resTitle = '';
  let resVal = '';

  if (solveFor === 'v') {
    resTitle = 'Voltage (V = I × R)';
    resVal = `${(i * r).toFixed(2)} Volts (V)`;
  } else if (solveFor === 'i') {
    resTitle = 'Current (I = V ÷ R)';
    resVal = r > 0 ? `${(v / r).toFixed(2)} Amperes (A)` : '0 A';
  } else if (solveFor === 'r') {
    resTitle = 'Resistance (R = V ÷ I)';
    resVal = i > 0 ? `${(v / i).toFixed(2)} Ohms (Ω)` : '0 Ω';
  } else {
    resTitle = 'Power (P = V × I)';
    resVal = `${(v * i).toFixed(2)} Watts (W)`;
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🔌</span>
        <div>
          <div className="calc-page-title">Electrical Calculator (Ohm's Law)</div>
          <div className="calc-page-desc">Calculate Voltage (V), Current (I), Resistance (R), and Electric Power (P)</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${solveFor === 'v' ? ' active' : ''}`} onClick={() => setSolveFor('v')}>Voltage (V)</button>
          <button className={`tab-btn${solveFor === 'i' ? ' active' : ''}`} onClick={() => setSolveFor('i')}>Current (I)</button>
          <button className={`tab-btn${solveFor === 'r' ? ' active' : ''}`} onClick={() => setSolveFor('r')}>Resistance (R)</button>
          <button className={`tab-btn${solveFor === 'p' ? ' active' : ''}`} onClick={() => setSolveFor('p')}>Power (P)</button>
        </div>

        <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
          {solveFor !== 'v' && (
            <div className="form-group">
              <label className="form-label">Voltage (Volts)</label>
              <input className="form-input" type="number" value={voltage} onChange={e => setVoltage(e.target.value)} />
            </div>
          )}

          {solveFor !== 'i' && (
            <div className="form-group">
              <label className="form-label">Current (Amps)</label>
              <input className="form-input" type="number" value={current} onChange={e => setCurrent(e.target.value)} />
            </div>
          )}

          {solveFor !== 'r' && solveFor !== 'p' && (
            <div className="form-group">
              <label className="form-label">Resistance (Ohms Ω)</label>
              <input className="form-input" type="number" value={resistance} onChange={e => setResistance(e.target.value)} />
            </div>
          )}
        </div>

        <div className="result-card">
          <div className="result-label">{resTitle}</div>
          <div className="result-main">{resVal}</div>
        </div>
      </div>
    </div>
  );
}
