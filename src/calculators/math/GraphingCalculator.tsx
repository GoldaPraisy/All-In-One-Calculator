import { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { evaluate } from 'mathjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PRESETS = ['x^2', 'x^3 - 3*x', 'sin(x)', 'cos(x)', 'tan(x)', '2^x', 'log(x)', 'sqrt(x)', 'abs(x)', '1/x'];

export default function GraphingCalculator() {
  const [formula, setFormula] = useState('x^2');
  const [xMin, setXMin] = useState('-10');
  const [xMax, setXMax] = useState('10');
  const [steps, setSteps] = useState(200);
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState<any>(null);

  const plot = useCallback(() => {
    setError('');
    const min = parseFloat(xMin), max = parseFloat(xMax);
    if (isNaN(min)||isNaN(max)||min>=max) { setError('Invalid x range'); return; }
    const xs: number[] = [];
    const ys: number[] = [];
    const step = (max - min) / steps;
    for (let i = 0; i <= steps; i++) {
      const x = min + i * step;
      try {
        const y = evaluate(formula.replace(/\^/g,'**'), { x });
        xs.push(parseFloat(x.toFixed(6)));
        ys.push(typeof y === 'number' && isFinite(y) ? parseFloat(y.toFixed(8)) : null as any);
      } catch { xs.push(x); ys.push(null as any); }
    }
    setChartData({
      labels: xs,
      datasets: [{
        label: `y = ${formula}`,
        data: ys,
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0,191,255,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
        fill: false,
        spanGaps: false,
      }]
    });
  }, [formula, xMin, xMax, steps]);

  useEffect(() => { plot(); }, [plot]);

  const options = {
    responsive: true,
    animation: { duration: 300 },
    scales: {
      x: {
        ticks: { color: '#555', maxTicksLimit: 10, callback: (v: any, i: number, ticks: any[]) => {
          const val = parseFloat(String(ticks[i]?.label ?? v));
          return isNaN(val) ? '' : parseFloat(val.toFixed(2));
        }},
        grid: { color: '#1a1a1a' },
        border: { color: '#2a2a2a' },
      },
      y: {
        ticks: { color: '#555' },
        grid: { color: '#1a1a1a' },
        border: { color: '#2a2a2a' },
      }
    },
    plugins: {
      legend: { labels: { color: '#aaa', font: { family: 'Poppins', size: 12 } } },
      tooltip: {
        backgroundColor: '#111',
        borderColor: '#00bfff',
        borderWidth: 1,
        titleColor: '#aaa',
        bodyColor: '#00bfff',
        callbacks: {
          title: (items: any[]) => `x = ${parseFloat(items[0].label).toFixed(4)}`,
          label: (item: any) => `y = ${parseFloat(item.raw).toFixed(6)}`,
        }
      }
    }
  };

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">📈</span>
        <div>
          <div className="calc-page-title">Graphing Calculator</div>
          <div className="calc-page-desc">Plot mathematical functions. Use <code>x</code> as variable. e.g. <code>sin(x)</code>, <code>x^2 + 2*x - 1</code></div>
        </div>
      </div>
      <div className="calc-card">
        <div className="form-group" style={{marginBottom:14}}>
          <label className="form-label">Function: y = f(x)</label>
          <div className="graph-input-row">
            <span className="eq-label">y =</span>
            <input className="form-input" value={formula} onChange={e=>setFormula(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&plot()} placeholder="e.g. x^2 + 2*x - 1" />
          </div>
        </div>
        <div className="form-grid form-grid-3" style={{marginBottom:14}}>
          <div className="form-group">
            <label className="form-label">X Min</label>
            <input className="form-input" type="number" value={xMin} onChange={e=>setXMin(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">X Max</label>
            <input className="form-input" type="number" value={xMax} onChange={e=>setXMax(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Points: {steps}</label>
            <input className="form-slider" type="range" min={50} max={500} value={steps} onChange={e=>setSteps(Number(e.target.value))} />
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <div className="form-label" style={{marginBottom:8}}>Preset Functions</div>
          <div className="chip-group">
            {PRESETS.map(p=>(
              <button key={p} className={`chip${formula===p?' active':''}`} onClick={()=>setFormula(p)}>{p}</button>
            ))}
          </div>
        </div>
        {error && <div className="warning-box">{error}</div>}
        <div className="action-row">
          <button className="action-btn action-btn-primary" onClick={plot}>📈 Plot Graph</button>
          <button className="action-btn action-btn-secondary" onClick={()=>{setFormula('x^2');setXMin('-10');setXMax('10')}}>Reset</button>
        </div>
        {chartData && (
          <div className="chart-container" style={{marginTop:20}}>
            <Line data={chartData} options={options as any} />
          </div>
        )}
      </div>
    </div>
  );
}
