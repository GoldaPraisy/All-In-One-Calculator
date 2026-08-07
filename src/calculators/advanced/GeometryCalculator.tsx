import React, { useState } from 'react';

export default function GeometryCalculator() {
  const [shape, setShape] = useState<'circle' | 'rectangle' | 'triangle' | 'sphere' | 'cylinder'>('circle');

  // Circle / Sphere / Cylinder
  const [radius, setRadius] = useState('5');
  const [height, setHeight] = useState('10');

  // Rectangle / Triangle
  const [length, setLength] = useState('8');
  const [width, setWidth] = useState('6');

  const r = parseFloat(radius) || 0;
  const h = parseFloat(height) || 0;
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;

  let title = '';
  let metrics: { label: string; value: string }[] = [];

  if (shape === 'circle') {
    const area = Math.PI * r * r;
    const perimeter = 2 * Math.PI * r;
    title = '2D Circle Metrics';
    metrics = [
      { label: 'Area (A = π r²)', value: `${area.toFixed(4)}` },
      { label: 'Circumference (C = 2 π r)', value: `${perimeter.toFixed(4)}` },
      { label: 'Diameter (d = 2 r)', value: `${(2 * r).toFixed(4)}` },
    ];
  } else if (shape === 'rectangle') {
    const area = l * w;
    const perimeter = 2 * (l + w);
    const diagonal = Math.sqrt(l * l + w * w);
    title = '2D Rectangle Metrics';
    metrics = [
      { label: 'Area (A = l × w)', value: `${area.toFixed(4)}` },
      { label: 'Perimeter (P = 2(l + w))', value: `${perimeter.toFixed(4)}` },
      { label: 'Diagonal (d = √(l² + w²))', value: `${diagonal.toFixed(4)}` },
    ];
  } else if (shape === 'triangle') {
    const area = 0.5 * l * w; // Base=l, Height=w
    const hypotenuse = Math.sqrt(l * l + w * w); // assuming right-angled
    title = '2D Right Triangle Metrics';
    metrics = [
      { label: 'Area (A = ½ base × height)', value: `${area.toFixed(4)}` },
      { label: 'Hypotenuse (c = √(a² + b²))', value: `${hypotenuse.toFixed(4)}` },
      { label: 'Perimeter (P = a + b + c)', value: `${(l + w + hypotenuse).toFixed(4)}` },
    ];
  } else if (shape === 'sphere') {
    const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
    const surfaceArea = 4 * Math.PI * r * r;
    title = '3D Sphere Metrics';
    metrics = [
      { label: 'Volume (V = ⁴/₃ π r³)', value: `${volume.toFixed(4)}` },
      { label: 'Surface Area (A = 4 π r²)', value: `${surfaceArea.toFixed(4)}` },
    ];
  } else {
    const volume = Math.PI * r * r * h;
    const surfaceArea = 2 * Math.PI * r * h + 2 * Math.PI * r * r;
    title = '3D Cylinder Metrics';
    metrics = [
      { label: 'Volume (V = π r² h)', value: `${volume.toFixed(4)}` },
      { label: 'Surface Area (A = 2πrh + 2πr²)', value: `${surfaceArea.toFixed(4)}` },
    ];
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">📐</span>
        <div>
          <div className="calc-page-title">Geometry & Volume Calculator</div>
          <div className="calc-page-desc">Area, perimeter, surface area, volume, and diagonals for 2D & 3D geometric shapes</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${shape === 'circle' ? ' active' : ''}`} onClick={() => setShape('circle')}>Circle</button>
          <button className={`tab-btn${shape === 'rectangle' ? ' active' : ''}`} onClick={() => setShape('rectangle')}>Rectangle</button>
          <button className={`tab-btn${shape === 'triangle' ? ' active' : ''}`} onClick={() => setShape('triangle')}>Triangle</button>
          <button className={`tab-btn${shape === 'sphere' ? ' active' : ''}`} onClick={() => setShape('sphere')}>Sphere</button>
          <button className={`tab-btn${shape === 'cylinder' ? ' active' : ''}`} onClick={() => setShape('cylinder')}>Cylinder</button>
        </div>

        <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
          {(shape === 'circle' || shape === 'sphere' || shape === 'cylinder') && (
            <div className="form-group">
              <label className="form-label">Radius (r)</label>
              <input className="form-input" type="number" value={radius} onChange={e => setRadius(e.target.value)} />
            </div>
          )}

          {shape === 'cylinder' && (
            <div className="form-group">
              <label className="form-label">Height (h)</label>
              <input className="form-input" type="number" value={height} onChange={e => setHeight(e.target.value)} />
            </div>
          )}

          {(shape === 'rectangle' || shape === 'triangle') && (
            <>
              <div className="form-group">
                <label className="form-label">{shape === 'triangle' ? 'Base (a)' : 'Length (l)'}</label>
                <input className="form-input" type="number" value={length} onChange={e => setLength(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">{shape === 'triangle' ? 'Height (b)' : 'Width (w)'}</label>
                <input className="form-input" type="number" value={width} onChange={e => setWidth(e.target.value)} />
              </div>
            </>
          )}
        </div>

        <div className="result-card">
          <div className="result-label">{title}</div>
          <div className="result-main">{metrics[0]?.value}</div>
          {metrics.map((m, i) => (
            <div key={i} className="result-row">
              <span className="result-row-label">{m.label}</span>
              <span className="result-row-value">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
