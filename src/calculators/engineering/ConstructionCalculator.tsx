import React, { useState } from 'react';

export default function ConstructionCalculator() {
  const [material, setMaterial] = useState<'concrete' | 'bricks' | 'tiles' | 'paint'>('concrete');

  // Concrete: Length, Width, Depth (m)
  const [len, setLen] = useState('5');
  const [width, setWidth] = useState('4');
  const [depth, setDepth] = useState('0.15'); // 15cm slab

  // Tiles: Room L & W (m), Tile L & W (cm)
  const [tileLen, setTileLen] = useState('30');
  const [tileWidth, setTileWidth] = useState('30');

  // Paint: Wall Area (m²), Coverage (m²/L)
  const [paintArea, setPaintArea] = useState('50');
  const [coverage, setCoverage] = useState('10'); // 10 m²/L

  const l = parseFloat(len) || 0;
  const w = parseFloat(width) || 0;
  const d = parseFloat(depth) || 0;

  let title = '';
  let mainResult = '';
  let details: { label: string; value: string }[] = [];

  if (material === 'concrete') {
    const volume = l * w * d; // m³
    const bags50kg = volume * 28; // approx 28 bags per m³ of 1:2:4 mix
    title = 'Concrete Volume & Cement Bags';
    mainResult = `${volume.toFixed(2)} m³`;
    details = [
      { label: 'Slab Volume', value: `${volume.toFixed(2)} cubic meters` },
      { label: 'Est. 50kg Cement Bags Needed', value: `~${Math.ceil(bags50kg)} bags` },
      { label: 'Est. Sand (m³)', value: `${(volume * 0.45).toFixed(2)} m³` },
      { label: 'Est. Aggregate (m³)', value: `${(volume * 0.9).toFixed(2)} m³` },
    ];
  } else if (material === 'bricks') {
    const wallArea = l * w; // using l as height, w as width
    const brickCount = wallArea * 50; // standard 50 bricks per m² single wall
    title = 'Brick Count Estimate';
    mainResult = `~${Math.ceil(brickCount)} bricks`;
    details = [
      { label: 'Wall Area', value: `${wallArea.toFixed(2)} m²` },
      { label: 'Bricks (Single Leaf Wall)', value: `~${Math.ceil(brickCount)} bricks` },
      { label: 'Bricks (+10% Waste)', value: `~${Math.ceil(brickCount * 1.1)} bricks` },
    ];
  } else if (material === 'tiles') {
    const roomArea = l * w;
    const tileAreaM2 = ((parseFloat(tileLen) || 30) / 100) * ((parseFloat(tileWidth) || 30) / 100);
    const tileCount = roomArea / tileAreaM2;
    title = 'Floor / Wall Tile Quantity';
    mainResult = `~${Math.ceil(tileCount)} tiles`;
    details = [
      { label: 'Room Surface Area', value: `${roomArea.toFixed(2)} m²` },
      { label: 'Single Tile Area', value: `${tileAreaM2.toFixed(4)} m²` },
      { label: 'Tiles Needed', value: `~${Math.ceil(tileCount)} tiles` },
      { label: 'Tiles (+10% Waste)', value: `~${Math.ceil(tileCount * 1.1)} tiles` },
    ];
  } else {
    const area = parseFloat(paintArea) || 0;
    const cov = parseFloat(coverage) || 10;
    const liters = area / cov;
    title = 'Paint Requirement';
    mainResult = `${liters.toFixed(2)} Liters`;
    details = [
      { label: 'Total Wall Surface Area', value: `${area} m²` },
      { label: 'Paint Coverage Rate', value: `${cov} m²/Liter` },
      { label: 'Single Coat Needed', value: `${liters.toFixed(2)} L` },
      { label: 'Double Coat Needed', value: `${(liters * 2).toFixed(2)} L` },
    ];
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🏗️</span>
        <div>
          <div className="calc-page-title">Construction Material Calculator</div>
          <div className="calc-page-desc">Estimate concrete volume, brick quantities, tile count, and paint liters</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${material === 'concrete' ? ' active' : ''}`} onClick={() => setMaterial('concrete')}>Concrete</button>
          <button className={`tab-btn${material === 'bricks' ? ' active' : ''}`} onClick={() => setMaterial('bricks')}>Bricks</button>
          <button className={`tab-btn${material === 'tiles' ? ' active' : ''}`} onClick={() => setMaterial('tiles')}>Tiles</button>
          <button className={`tab-btn${material === 'paint' ? ' active' : ''}`} onClick={() => setMaterial('paint')}>Paint</button>
        </div>

        {material === 'concrete' && (
          <div className="form-grid form-grid-3" style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label className="form-label">Slab Length (m)</label>
              <input className="form-input" type="number" value={len} onChange={e => setLen(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Slab Width (m)</label>
              <input className="form-input" type="number" value={width} onChange={e => setWidth(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Thickness / Depth (m)</label>
              <input className="form-input" type="number" step="0.01" value={depth} onChange={e => setDepth(e.target.value)} />
            </div>
          </div>
        )}

        {material === 'bricks' && (
          <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label className="form-label">Wall Height (m)</label>
              <input className="form-input" type="number" value={len} onChange={e => setLen(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Wall Length (m)</label>
              <input className="form-input" type="number" value={width} onChange={e => setWidth(e.target.value)} />
            </div>
          </div>
        )}

        {material === 'tiles' && (
          <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label className="form-label">Room Length (m)</label>
              <input className="form-input" type="number" value={len} onChange={e => setLen(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Room Width (m)</label>
              <input className="form-input" type="number" value={width} onChange={e => setWidth(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tile Length (cm)</label>
              <input className="form-input" type="number" value={tileLen} onChange={e => setTileLen(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tile Width (cm)</label>
              <input className="form-input" type="number" value={tileWidth} onChange={e => setTileWidth(e.target.value)} />
            </div>
          </div>
        )}

        {material === 'paint' && (
          <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label className="form-label">Wall Surface Area (m²)</label>
              <input className="form-input" type="number" value={paintArea} onChange={e => setPaintArea(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Coverage (m²/Liter)</label>
              <input className="form-input" type="number" value={coverage} onChange={e => setCoverage(e.target.value)} />
            </div>
          </div>
        )}

        <div className="result-card">
          <div className="result-label">{title}</div>
          <div className="result-main">{mainResult}</div>
          {details.map((d, i) => (
            <div key={i} className="result-row">
              <span className="result-row-label">{d.label}</span>
              <span className="result-row-value">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
