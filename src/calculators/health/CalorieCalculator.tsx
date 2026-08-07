import React, { useState } from 'react';

export default function CalorieCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('25');
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('70');
  const [activity, setActivity] = useState('1.375'); // Activity multiplier

  const a = parseFloat(age) || 0;
  const h = parseFloat(heightCm) || 0;
  const w = parseFloat(weightKg) || 0;
  const act = parseFloat(activity) || 1.2;

  // Mifflin-St Jeor Formula
  let bmr = 0;
  if (w > 0 && h > 0 && a > 0) {
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }
  }

  const tdee = bmr * act;
  const weightLoss = tdee - 500;
  const weightGain = tdee + 500;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🔥</span>
        <div>
          <div className="calc-page-title">Calorie & TDEE Calculator</div>
          <div className="calc-page-desc">Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${gender === 'male' ? ' active' : ''}`} onClick={() => setGender('male')}>Male</button>
          <button className={`tab-btn${gender === 'female' ? ' active' : ''}`} onClick={() => setGender('female')}>Female</button>
        </div>

        <div className="form-grid form-grid-3" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Age (Years)</label>
            <input className="form-input" type="number" value={age} onChange={e => setAge(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Height (cm)</label>
            <input className="form-input" type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <input className="form-input" type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)} />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Activity Level</label>
          <select className="form-select" value={activity} onChange={e => setActivity(e.target.value)}>
            <option value="1.2">Sedentary (Little to no exercise)</option>
            <option value="1.375">Lightly Active (Exercise 1-3 days/week)</option>
            <option value="1.55">Moderately Active (Exercise 3-5 days/week)</option>
            <option value="1.725">Very Active (Exercise 6-7 days/week)</option>
            <option value="1.9">Extra Active (Hard exercise & physical job)</option>
          </select>
        </div>

        {bmr > 0 && (
          <div>
            <div className="result-card" style={{ marginBottom: 20 }}>
              <div className="result-label">Daily Maintenance Calories (TDEE)</div>
              <div className="result-main">{Math.round(tdee).toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>kcal/day</span></div>
              <div className="result-row">
                <span className="result-row-label">Basal Metabolic Rate (BMR)</span>
                <span className="result-row-value">{Math.round(bmr).toLocaleString()} kcal</span>
              </div>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Goal</th>
                    <th>Daily Calorie Intake</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Maintain Weight</td><td>{Math.round(tdee).toLocaleString()} kcal/day</td></tr>
                  <tr><td>Mild Weight Loss (0.25 kg/wk)</td><td>{Math.round(tdee - 250).toLocaleString()} kcal/day</td></tr>
                  <tr><td>Weight Loss (0.5 kg/wk)</td><td>{Math.round(weightLoss).toLocaleString()} kcal/day</td></tr>
                  <tr><td>Extreme Weight Loss (1 kg/wk)</td><td>{Math.round(tdee - 1000).toLocaleString()} kcal/day</td></tr>
                  <tr><td>Weight Gain (0.5 kg/wk)</td><td>{Math.round(weightGain).toLocaleString()} kcal/day</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
