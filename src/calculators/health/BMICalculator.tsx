import { useState } from 'react';

export default function BMICalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('70');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');
  const [weightLbs, setWeightLbs] = useState('154');

  let bmi = 0;

  if (unit === 'metric') {
    const h = (parseFloat(heightCm) || 0) / 100;
    const w = parseFloat(weightKg) || 0;
    if (h > 0 && w > 0) bmi = w / (h * h);
  } else {
    const ft = parseFloat(heightFt) || 0;
    const inc = parseFloat(heightIn) || 0;
    const totalIn = ft * 12 + inc;
    const lbs = parseFloat(weightLbs) || 0;
    if (totalIn > 0 && lbs > 0) bmi = (lbs / (totalIn * totalIn)) * 703;
  }

  const getCategory = (val: number) => {
    if (val < 18.5) return { name: 'Underweight', class: 'underweight', color: '#4488ff', desc: 'BMI is below 18.5. Consider consulting a nutritionist.' };
    if (val < 25) return { name: 'Normal weight', class: 'normal', color: '#44dd88', desc: 'Healthy weight range. Great job maintaining fitness!' };
    if (val < 30) return { name: 'Overweight', class: 'overweight', color: '#ffaa00', desc: 'BMI between 25 and 29.9. Regular exercise is recommended.' };
    return { name: 'Obese', class: 'obese', color: '#ff4444', desc: 'BMI is 30 or higher. Consult a healthcare provider for guidance.' };
  };

  const cat = bmi > 0 ? getCategory(bmi) : null;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">⚖️</span>
        <div>
          <div className="calc-page-title">BMI (Body Mass Index) Calculator</div>
          <div className="calc-page-desc">Calculate Body Mass Index using height and weight in metric or imperial units</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 550, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${unit === 'metric' ? ' active' : ''}`} onClick={() => setUnit('metric')}>Metric (cm, kg)</button>
          <button className={`tab-btn${unit === 'imperial' ? ' active' : ''}`} onClick={() => setUnit('imperial')}>Imperial (ft/in, lbs)</button>
        </div>

        {unit === 'metric' ? (
          <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label className="form-label">Height (cm)</label>
              <input className="form-input" type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input className="form-input" type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="form-grid form-grid-3" style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label className="form-label">Height (Feet)</label>
              <input className="form-input" type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Height (Inches)</label>
              <input className="form-input" type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Weight (lbs)</label>
              <input className="form-input" type="number" value={weightLbs} onChange={e => setWeightLbs(e.target.value)} />
            </div>
          </div>
        )}

        {bmi > 0 && cat && (
          <div>
            <div className="result-card" style={{ marginBottom: 16 }}>
              <div className="result-label">Your Body Mass Index</div>
              <div className="result-main">{bmi.toFixed(1)}</div>
              <div style={{ margin: '8px 0' }}>
                <span className="bmi-category-badge" style={{ background: `${cat.color}22`, border: `1px solid ${cat.color}`, color: cat.color }}>
                  {cat.name}
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{cat.desc}</div>
            </div>

            <div className="bmi-meter">
              <div className="bmi-scale">
                <div className={`bmi-scale-seg underweight${cat.class !== 'underweight' ? ' inactive' : ''}`} />
                <div className={`bmi-scale-seg normal${cat.class !== 'normal' ? ' inactive' : ''}`} />
                <div className={`bmi-scale-seg overweight${cat.class !== 'overweight' ? ' inactive' : ''}`} />
                <div className={`bmi-scale-seg obese${cat.class !== 'obese' ? ' inactive' : ''}`} />
              </div>
              <div className="bmi-labels">
                <span>&lt; 18.5</span>
                <span>18.5 - 24.9</span>
                <span>25 - 29.9</span>
                <span>30+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
