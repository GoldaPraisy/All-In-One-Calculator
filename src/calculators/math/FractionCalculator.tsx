import { useState } from 'react';

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [NaN, 1];
  const g = gcd(Math.abs(n), Math.abs(d));
  const sign = d < 0 ? -1 : 1;
  return [(sign * n) / g, (sign * d) / g];
}

function fracStr(n: number, d: number): string {
  const [sn, sd] = simplify(n, d);
  if (isNaN(sn)) return 'Undefined';
  if (sd === 1) return String(sn);
  return `${sn}/${sd}`;
}

export default function FractionCalculator() {
  const [n1, setN1] = useState('1'); const [d1, setD1] = useState('2');
  const [n2, setN2] = useState('1'); const [d2, setD2] = useState('3');
  const [op, setOp] = useState('+');
  const [result, setResult] = useState<{frac:string;decimal:string}|null>(null);

  const calculate = () => {
    const a = parseInt(n1)||0, b = parseInt(d1)||1;
    const c = parseInt(n2)||0, d = parseInt(d2)||1;
    let rn: number, rd: number;
    switch(op) {
      case '+': rn = a*d + c*b; rd = b*d; break;
      case '-': rn = a*d - c*b; rd = b*d; break;
      case '×': rn = a*c; rd = b*d; break;
      case '÷': rn = a*d; rd = b*c; break;
      default: return;
    }
    const [sn,sd] = simplify(rn,rd);
    setResult({ frac: fracStr(sn,sd), decimal: isNaN(sn)?'Undefined':String(parseFloat((sn/sd).toFixed(10))) });
  };

  const fracInput = (n:string,setN:any,d:string,setD:any) => (
    <div style={{display:'flex',alignItems:'center',gap:4}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
        <input className="form-input" value={n} onChange={e=>setN(e.target.value)} style={{width:70,textAlign:'center'}} placeholder="Num" />
        <div style={{width:70,height:2,background:'var(--electric-blue)',borderRadius:1}} />
        <input className="form-input" value={d} onChange={e=>setD(e.target.value)} style={{width:70,textAlign:'center'}} placeholder="Den" />
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">½</span>
        <div>
          <div className="calc-page-title">Fraction Calculator</div>
          <div className="calc-page-desc">Add, subtract, multiply and divide fractions with automatic simplification</div>
        </div>
      </div>
      <div className="calc-card" style={{maxWidth:500,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:20,marginBottom:24,flexWrap:'wrap'}}>
          {fracInput(n1,setN1,d1,setD1)}
          <div>
            <div className="tab-nav" style={{flexDirection:'column',background:'none',gap:6}}>
              {['+','-','×','÷'].map(o=>(
                <button key={o} className={`tab-btn${op===o?' active':''}`} onClick={()=>setOp(o)}>{o}</button>
              ))}
            </div>
          </div>
          {fracInput(n2,setN2,d2,setD2)}
        </div>
        <div className="action-row" style={{justifyContent:'center'}}>
          <button className="action-btn action-btn-primary" onClick={calculate}>= Calculate</button>
          <button className="action-btn action-btn-secondary" onClick={()=>setResult(null)}>Clear</button>
        </div>
        {result && (
          <div className="result-card" style={{textAlign:'center'}}>
            <div className="result-label">Result</div>
            <div className="result-main">{result.frac}</div>
            <div className="result-row">
              <span className="result-row-label">As Fraction</span>
              <span className="result-row-value highlight">{result.frac}</span>
            </div>
            <div className="result-row">
              <span className="result-row-label">As Decimal</span>
              <span className="result-row-value">{result.decimal}</span>
            </div>
            <div className="result-row">
              <span className="result-row-label">Expression</span>
              <span className="result-row-value">{n1}/{d1} {op} {n2}/{d2}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
