import { useState } from 'react';
import { mean, median, mode, variance, std, min, max, sum } from 'mathjs';

export default function StatisticsCalculator() {
  const [rawInput, setRawInput] = useState('10, 15, 20, 25, 30, 35, 40');

  const nums = rawInput
    .split(/[\s,]+/)
    .map(v => parseFloat(v))
    .filter(v => !isNaN(v));

  let stats: any = null;

  if (nums.length > 0) {
    try {
      const calcMean = mean(nums);
      const calcMedian = median(nums);
      const calcMode = mode(nums);
      const calcVar = nums.length > 1 ? variance(nums) : 0;
      const calcStd = nums.length > 1 ? std(nums) : 0;
      const calcMin = min(nums);
      const calcMax = max(nums);
      const calcSum = sum(nums);
      const range = calcMax - calcMin;

      stats = {
        count: nums.length,
        sum: calcSum,
        mean: Number(calcMean).toFixed(4),
        median: Number(calcMedian).toFixed(4),
        mode: Array.isArray(calcMode) ? calcMode.join(', ') : String(calcMode),
        variance: Number(calcVar).toFixed(4),
        stdDev: Number(calcStd).toFixed(4),
        min: calcMin,
        max: calcMax,
        range: range,
      };
    } catch {
      stats = null;
    }
  }

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">📊</span>
        <div>
          <div className="calc-page-title">Statistics Calculator</div>
          <div className="calc-page-desc">Mean, median, mode, variance, standard deviation, and summary metrics</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 650, margin: '0 auto' }}>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Data Set (comma or space separated numbers)</label>
          <textarea
            className="form-input"
            rows={3}
            value={rawInput}
            onChange={e => setRawInput(e.target.value)}
            placeholder="e.g. 12, 18, 25, 40, 55"
          />
        </div>

        {stats ? (
          <div>
            <div className="result-card" style={{ marginBottom: 20 }}>
              <div className="result-label">Mean (Average)</div>
              <div className="result-main">{stats.mean}</div>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Count (N)</td><td>{stats.count}</td></tr>
                  <tr><td>Sum</td><td>{stats.sum}</td></tr>
                  <tr><td>Mean</td><td>{stats.mean}</td></tr>
                  <tr><td>Median</td><td>{stats.median}</td></tr>
                  <tr><td>Mode</td><td>{stats.mode}</td></tr>
                  <tr><td>Variance (s²)</td><td>{stats.variance}</td></tr>
                  <tr><td>Standard Dev (s)</td><td>{stats.stdDev}</td></tr>
                  <tr><td>Minimum</td><td>{stats.min}</td></tr>
                  <tr><td>Maximum</td><td>{stats.max}</td></tr>
                  <tr><td>Range</td><td>{stats.range}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="warning-box">Enter valid numbers separated by commas or spaces to see statistical results.</div>
        )}
      </div>
    </div>
  );
}
