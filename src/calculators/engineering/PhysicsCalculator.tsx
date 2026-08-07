import React, { useState } from 'react';

export default function PhysicsCalculator() {
  const [topic, setTopic] = useState<'force' | 'ke' | 'pe' | 'momentum' | 'pressure'>('force');

  // Force: F = m * a
  const [mass, setMass] = useState('10');
  const [accel, setAccel] = useState('9.81');

  // KE: 1/2 m v^2
  const [vel, setVel] = useState('15');

  // PE: m g h
  const [height, setHeight] = useState('20');

  // Pressure: F / A
  const [area, setArea] = useState('2');

  const m = parseFloat(mass) || 0;
  const a = parseFloat(accel) || 0;
  const v = parseFloat(vel) || 0;
  const h = parseFloat(height) || 0;
  const ar = parseFloat(area) || 1;

  const g = 9.81;

  let resultTitle = '';
  let resultValue = '';
  let formula = '';

  switch (topic) {
    case 'force':
      resultTitle = 'Force (F)';
      resultValue = `${(m * a).toFixed(2)} N (Newtons)`;
      formula = 'F = mass × acceleration';
      break;
    case 'ke':
      resultTitle = 'Kinetic Energy (KE)';
      resultValue = `${(0.5 * m * v * v).toFixed(2)} J (Joules)`;
      formula = 'KE = ½ × mass × velocity²';
      break;
    case 'pe':
      resultTitle = 'Potential Energy (PE)';
      resultValue = `${(m * g * h).toFixed(2)} J (Joules)`;
      formula = 'PE = mass × gravity (9.81 m/s²) × height';
      break;
    case 'momentum':
      resultTitle = 'Momentum (p)';
      resultValue = `${(m * v).toFixed(2)} kg·m/s`;
      formula = 'p = mass × velocity';
      break;
    case 'pressure':
      resultTitle = 'Pressure (P)';
      resultValue = `${((m * a) / ar).toFixed(2)} Pa (Pascals)`;
      formula = 'P = Force ÷ Area';
      break;
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">⚡</span>
        <div>
          <div className="calc-page-title">Physics Calculator</div>
          <div className="calc-page-desc">Calculate force, kinetic energy, potential energy, momentum, and pressure</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${topic === 'force' ? ' active' : ''}`} onClick={() => setTopic('force')}>Force (F)</button>
          <button className={`tab-btn${topic === 'ke' ? ' active' : ''}`} onClick={() => setTopic('ke')}>Kinetic Energy</button>
          <button className={`tab-btn${topic === 'pe' ? ' active' : ''}`} onClick={() => setTopic('pe')}>Potential Energy</button>
          <button className={`tab-btn${topic === 'momentum' ? ' active' : ''}`} onClick={() => setTopic('momentum')}>Momentum</button>
          <button className={`tab-btn${topic === 'pressure' ? ' active' : ''}`} onClick={() => setTopic('pressure')}>Pressure</button>
        </div>

        <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
          {(topic === 'force' || topic === 'ke' || topic === 'pe' || topic === 'momentum' || topic === 'pressure') && (
            <div className="form-group">
              <label className="form-label">Mass (kg)</label>
              <input className="form-input" type="number" value={mass} onChange={e => setMass(e.target.value)} />
            </div>
          )}

          {(topic === 'force' || topic === 'pressure') && (
            <div className="form-group">
              <label className="form-label">Acceleration (m/s²)</label>
              <input className="form-input" type="number" value={accel} onChange={e => setAccel(e.target.value)} />
            </div>
          )}

          {(topic === 'ke' || topic === 'momentum') && (
            <div className="form-group">
              <label className="form-label">Velocity (m/s)</label>
              <input className="form-input" type="number" value={vel} onChange={e => setVel(e.target.value)} />
            </div>
          )}

          {topic === 'pe' && (
            <div className="form-group">
              <label className="form-label">Height (m)</label>
              <input className="form-input" type="number" value={height} onChange={e => setHeight(e.target.value)} />
            </div>
          )}

          {topic === 'pressure' && (
            <div className="form-group">
              <label className="form-label">Area (m²)</label>
              <input className="form-input" type="number" value={area} onChange={e => setArea(e.target.value)} />
            </div>
          )}
        </div>

        <div className="result-card">
          <div className="result-label">{resultTitle}</div>
          <div className="result-main" style={{ fontSize: '1.8rem' }}>{resultValue}</div>
          <div className="result-row">
            <span className="result-row-label">Formula</span>
            <span className="result-row-value">{formula}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
