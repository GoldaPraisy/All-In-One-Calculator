import { useState } from 'react';
import { evaluate, factorial, round } from 'mathjs';

const SCI_BUTTONS = [
  ['sin','cos','tan','log','ln'],
  ['sin⁻¹','cos⁻¹','tan⁻¹','log₂','√'],
  ['x²','x³','xʸ','π','e'],
  ['n!','(',')','^','EXP'],
  ['C','±','%','÷'],
  ['7','8','9','×'],
  ['4','5','6','−'],
  ['1','2','3','+'],
  ['0','.','⌫','='],
];

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expr, setExpr] = useState('');
  const [newNum, setNewNum] = useState(true);
  const [radDeg, setRadDeg] = useState<'RAD'|'DEG'>('DEG');
  const [history, setHistory] = useState<{expr:string;result:string}[]>([]);

  const toRad = (deg: number) => deg * Math.PI / 180;

  const handleBtn = (btn: string) => {
    const appendExpr = (s: string) => { setExpr(prev => prev + s); setDisplay(s); setNewNum(true); };
    switch(btn) {
      case 'C': setDisplay('0'); setExpr(''); setNewNum(true); break;
      case '⌫': setDisplay(d => d.length>1?d.slice(0,-1):'0'); break;
      case '±': setDisplay(d => d.startsWith('-')?d.slice(1):'-'+d); break;
      case '(': appendExpr('('); break;
      case ')': appendExpr(')'); break;
      case 'π': appendExpr('3.14159265358979'); break;
      case 'e': appendExpr('2.71828182845904'); break;
      case 'EXP': appendExpr('e'); break;
      case 'x²': appendExpr(`(${display})^2`); break;
      case 'x³': appendExpr(`(${display})^3`); break;
      case 'xʸ': setExpr(prev=>prev+display+'^'); setNewNum(true); break;
      case '^': setExpr(prev=>prev+display+'^'); setNewNum(true); break;
      case '√': appendExpr(`sqrt(${display})`); break;
      case 'log': appendExpr(`log10(${display})`); break;
      case 'ln': appendExpr(`log(${display})`); break;
      case 'log₂': appendExpr(`log2(${display})`); break;
      case 'sin': {
        const v = radDeg==='DEG'? toRad(parseFloat(display)) : parseFloat(display);
        const r = round(Math.sin(v),10); setDisplay(String(r)); setExpr(prev=>prev+`sin(${display})`); setNewNum(true); break;
      }
      case 'cos': {
        const v = radDeg==='DEG'? toRad(parseFloat(display)) : parseFloat(display);
        const r = round(Math.cos(v),10); setDisplay(String(r)); setExpr(prev=>prev+`cos(${display})`); setNewNum(true); break;
      }
      case 'tan': {
        const v = radDeg==='DEG'? toRad(parseFloat(display)) : parseFloat(display);
        const r = round(Math.tan(v),10); setDisplay(String(r)); setExpr(prev=>prev+`tan(${display})`); setNewNum(true); break;
      }
      case 'sin⁻¹': { const r = round(radDeg==='DEG'?Math.asin(parseFloat(display))*180/Math.PI:Math.asin(parseFloat(display)),10); setDisplay(String(r)); setNewNum(true); break; }
      case 'cos⁻¹': { const r = round(radDeg==='DEG'?Math.acos(parseFloat(display))*180/Math.PI:Math.acos(parseFloat(display)),10); setDisplay(String(r)); setNewNum(true); break; }
      case 'tan⁻¹': { const r = round(radDeg==='DEG'?Math.atan(parseFloat(display))*180/Math.PI:Math.atan(parseFloat(display)),10); setDisplay(String(r)); setNewNum(true); break; }
      case 'n!': {
        const n = parseInt(display); 
        if(n<0||n>170){setDisplay('Error');break;}
        const r = factorial(n); setDisplay(String(r)); setNewNum(true); break;
      }
      case '%': {
        const r = parseFloat(display)/100; setDisplay(String(r)); setNewNum(true); break;
      }
      case '=': {
        const full = expr + (newNum ? '' : display);
        try {
          const safe = full.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
          const res = evaluate(safe);
          const resStr = Number.isFinite(Number(res)) ? String(parseFloat(Number(res).toFixed(10))) : 'Error';
          setHistory(h => [{expr:full+' =',result:resStr},...h].slice(0,20));
          setDisplay(resStr); setExpr(''); setNewNum(true);
        } catch { setDisplay('Error'); setExpr(''); setNewNum(true); }
        break;
      }
      case '÷': case '×': case '−': case '+':
        setExpr(prev => prev + display + btn); setNewNum(true); break;
      case '.':
        if(newNum){setDisplay('0.');setNewNum(false);}
        else if(!display.includes('.')) setDisplay(d=>d+'.'); break;
      default:
        if(newNum){setDisplay(btn);setNewNum(false);}
        else setDisplay(d=>d==='0'?btn:d+btn);
    }
  };

  const getType = (b: string) => {
    if(b==='=') return 'calc-btn calc-btn-eq';
    if(b==='C') return 'calc-btn calc-btn-clear';
    if(['÷','×','−','+'].includes(b)) return 'calc-btn calc-btn-op';
    if(['sin','cos','tan','sin⁻¹','cos⁻¹','tan⁻¹','log','ln','log₂','√','x²','x³','xʸ','^','n!','(',')','^','EXP','π','e','log₂'].includes(b)) return 'calc-btn calc-btn-func';
    if(['%','±','⌫'].includes(b)) return 'calc-btn calc-btn-func';
    return 'calc-btn calc-btn-num';
  };

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🔬</span>
        <div>
          <div className="calc-page-title">Scientific Calculator</div>
          <div className="calc-page-desc">Trigonometry, logarithms, powers, roots, factorials and more</div>
        </div>
      </div>
      <div className="calc-card" style={{maxWidth:500,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:10}}>
          <div className="chip-group">
            <button className={`chip${radDeg==='DEG'?' active':''}`} onClick={()=>setRadDeg('DEG')}>DEG</button>
            <button className={`chip${radDeg==='RAD'?' active':''}`} onClick={()=>setRadDeg('RAD')}>RAD</button>
          </div>
        </div>
        <div className="calc-display">
          <div className="calc-display-expr">{expr||'\u00a0'}</div>
          <div className="calc-display-result" style={{fontSize:display.length>14?'1.2rem':'2rem'}}>{display}</div>
        </div>
        <div className="btn-grid btn-grid-5">
          {SCI_BUTTONS.flat().map((btn,i) => (
            <button key={i} className={getType(btn)} onClick={()=>handleBtn(btn)} style={{padding:'11px 4px',fontSize:'0.78rem'}}>
              {btn}
            </button>
          ))}
        </div>
      </div>
      {history.length>0 && (
        <div className="history-panel" style={{maxWidth:500,margin:'16px auto 0'}}>
          <div className="history-title">History</div>
          {history.map((h,i)=>(
            <div key={i} className="history-item">
              <span className="history-expr">{h.expr}</span>
              <span className="history-result">{h.result}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
