import { useState } from 'react';
import { convertTemperature } from '../../data/unitData';

export default function TemperatureCalculator() {
  const [val, setVal] = useState('25');
  const [from, setFrom] = useState('C');
  const [to, setTo] = useState('F');

  const num = parseFloat(val) || 0;
  const result = convertTemperature(num, from, to);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🌡️</span>
        <div>
          <div className="calc-page-title">Temperature Converter</div>
          <div className="calc-page-desc">Convert between Celsius (°C), Fahrenheit (°F), Kelvin (K), and Rankine (°R)</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 550, margin: '0 auto' }}>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Temperature Value</label>
          <input className="form-input" type="number" value={val} onChange={e => setVal(e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">From Unit</label>
            <select className="form-select" value={from} onChange={e => setFrom(e.target.value)}>
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
              <option value="R">Rankine (°R)</option>
            </select>
          </div>

          <button className="action-btn action-btn-secondary" style={{ padding: '10px 14px', marginTop: 18 }} onClick={swap}>
            ⇄
          </button>

          <div className="form-group">
            <label className="form-label">To Unit</label>
            <select className="form-select" value={to} onChange={e => setTo(e.target.value)}>
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
              <option value="R">Rankine (°R)</option>
            </select>
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">Result</div>
          <div className="result-main">{result.toFixed(2)} °{to}</div>
          <div className="result-row">
            <span className="result-row-label">Celsius Equivalent</span>
            <span className="result-row-value">{convertTemperature(num, from, 'C').toFixed(2)} °C</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Fahrenheit Equivalent</span>
            <span className="result-row-value">{convertTemperature(num, from, 'F').toFixed(2)} °F</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Kelvin Equivalent</span>
            <span className="result-row-value">{convertTemperature(num, from, 'K').toFixed(2)} K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
