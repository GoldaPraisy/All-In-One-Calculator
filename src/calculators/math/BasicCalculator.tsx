import React, { useState, useCallback } from 'react';
import { evaluate } from 'mathjs';

const BUTTONS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '⌫', '='],
];

const getType = (b: string) => {
  if (b === '=') return 'calc-btn calc-btn-eq';
  if (b === 'C') return 'calc-btn calc-btn-clear';
  if (['÷','×','−','+','%','±'].includes(b)) return 'calc-btn calc-btn-op';
  if (b === '⌫') return 'calc-btn calc-btn-func';
  return 'calc-btn calc-btn-num';
};

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [expr, setExpr] = useState('');
  const [newNum, setNewNum] = useState(true);
  const [history, setHistory] = useState<{expr:string;result:string}[]>([]);
  const [copied, setCopied] = useState(false);

  const handleBtn = useCallback((btn: string) => {
    switch(btn) {
      case 'C':
        setDisplay('0'); setExpr(''); setNewNum(true); break;
      case '⌫':
        setDisplay(prev => prev.length > 1 ? prev.slice(0,-1) : '0');
        break;
      case '±':
        setDisplay(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
        break;
      case '=': {
        const full = expr + display;
        try {
          const safe = full.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
          const res = evaluate(safe);
          const resStr = Number.isFinite(res) ? String(parseFloat(res.toFixed(10))) : 'Error';
          setHistory(h => [{expr: full + ' =', result: resStr}, ...h].slice(0,20));
          setDisplay(resStr); setExpr(''); setNewNum(true);
        } catch { setDisplay('Error'); setExpr(''); setNewNum(true); }
        break;
      }
      case '÷': case '×': case '−': case '+':
        setExpr(prev => prev + display + btn);
        setNewNum(true); break;
      case '.':
        if (newNum) { setDisplay('0.'); setNewNum(false); }
        else if (!display.includes('.')) setDisplay(d => d + '.');
        break;
      default:
        if (newNum) { setDisplay(btn); setNewNum(false); }
        else setDisplay(d => d === '0' ? btn : d + btn);
    }
  }, [display, expr, newNum]);

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">➕</span>
        <div>
          <div className="calc-page-title">Basic Calculator</div>
          <div className="calc-page-desc">Addition, subtraction, multiplication, division with calculation history</div>
        </div>
      </div>
      <div className="calc-card" style={{maxWidth: 380, margin: '0 auto'}}>
        <div className="calc-display">
          <div className="calc-display-expr">{expr || '\u00a0'}</div>
          <div className="calc-display-result" style={{fontSize: display.length > 12 ? '1.4rem' : '2.2rem'}}>{display}</div>
          <div style={{position:'absolute',top:10,right:14}}>
            <button className={`copy-btn${copied?' copied':''}`} onClick={handleCopy}>{copied ? '✓ Copied' : 'Copy'}</button>
          </div>
        </div>
        <div className="btn-grid btn-grid-4">
          {BUTTONS.flat().map((btn,i) => (
            <button key={i} className={`${getType(btn)}${btn==='0'?' calc-btn-span2':''}`}
              style={btn==='0'?{gridColumn:'span 2'}:{}}
              onClick={() => handleBtn(btn)}>
              {btn}
            </button>
          ))}
        </div>
      </div>
      {history.length > 0 && (
        <div className="history-panel" style={{maxWidth:380,margin:'16px auto 0'}}>
          <div className="history-title">History</div>
          {history.map((h,i) => (
            <div key={i} className="history-item" onClick={() => { setDisplay(h.result); setNewNum(true); }}>
              <span className="history-expr">{h.expr}</span>
              <span className="history-result">{h.result}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
