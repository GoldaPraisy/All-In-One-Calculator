import React, { useState } from 'react';
import {
  LENGTH_UNITS, WEIGHT_UNITS, AREA_UNITS, VOLUME_UNITS, SPEED_UNITS, type UnitDef
} from '../../data/unitData';

interface Props {
  type: 'length' | 'weight' | 'area' | 'volume' | 'speed';
  title: string;
  icon: string;
}

const UNIT_MAP: Record<string, UnitDef[]> = {
  length: LENGTH_UNITS,
  weight: WEIGHT_UNITS,
  area: AREA_UNITS,
  volume: VOLUME_UNITS,
  speed: SPEED_UNITS,
};

export default function UnitConverter({ type, title, icon }: Props) {
  const units = UNIT_MAP[type] || LENGTH_UNITS;
  const [val, setVal] = useState('1');
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);

  const num = parseFloat(val) || 0;
  const fromUnit = units[fromIdx] || units[0];
  const toUnit = units[toIdx] || units[1];

  // Convert value to base unit, then to target unit
  const baseVal = num * fromUnit.toBase;
  const result = toUnit.toBase !== 0 ? baseVal / toUnit.toBase : 0;

  const swap = () => {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
  };

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">{icon}</span>
        <div>
          <div className="calc-page-title">{title}</div>
          <div className="calc-page-desc">Convert between metric and imperial {type} units instantaneously</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Input Value</label>
          <input className="form-input" type="number" value={val} onChange={e => setVal(e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">From Unit</label>
            <select className="form-select" value={fromIdx} onChange={e => setFromIdx(Number(e.target.value))}>
              {units.map((u, i) => (
                <option key={i} value={i}>{u.label}</option>
              ))}
            </select>
          </div>

          <button className="action-btn action-btn-secondary" style={{ padding: '10px 14px', marginTop: 18 }} onClick={swap}>
            ⇄
          </button>

          <div className="form-group">
            <label className="form-label">To Unit</label>
            <select className="form-select" value={toIdx} onChange={e => setToIdx(Number(e.target.value))}>
              {units.map((u, i) => (
                <option key={i} value={i}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">Converted Value</div>
          <div className="result-main" style={{ wordBreak: 'break-all' }}>
            {Number.isInteger(result) ? result : result.toFixed(6).replace(/\.?0+$/, '')}
          </div>
          <div className="result-row">
            <span className="result-row-label">Conversion Formula</span>
            <span className="result-row-value">1 {fromUnit.label.split(' ')[0]} = {(fromUnit.toBase / toUnit.toBase).toFixed(6).replace(/\.?0+$/, '')} {toUnit.label.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
