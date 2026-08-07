import React, { useState } from 'react';

export default function GSTCalculator() {
  const [amount, setAmount] = useState('1000');
  const [taxRate, setTaxRate] = useState('18');
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  const amt = parseFloat(amount) || 0;
  const rate = parseFloat(taxRate) || 0;

  let gstAmount = 0;
  let netAmount = 0;
  let grossAmount = 0;

  if (mode === 'exclusive') {
    netAmount = amt;
    gstAmount = (amt * rate) / 100;
    grossAmount = amt + gstAmount;
  } else {
    grossAmount = amt;
    netAmount = amt / (1 + rate / 100);
    gstAmount = amt - netAmount;
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🧾</span>
        <div>
          <div className="calc-page-title">GST / Tax Calculator</div>
          <div className="calc-page-desc">Calculate GST / VAT / Sales Tax inclusive or exclusive of initial price</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 550, margin: '0 auto' }}>
        <div className="tab-nav">
          <button className={`tab-btn${mode === 'exclusive' ? ' active' : ''}`} onClick={() => setMode('exclusive')}>Add GST (Exclusive)</button>
          <button className={`tab-btn${mode === 'inclusive' ? ' active' : ''}`} onClick={() => setMode('inclusive')}>Remove GST (Inclusive)</button>
        </div>

        <div className="form-grid form-grid-2" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">{mode === 'exclusive' ? 'Net Amount' : 'Total Amount'}</label>
            <input className="form-input" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">GST / Tax Rate (%)</label>
            <input className="form-input" type="number" step="0.1" value={taxRate} onChange={e => setTaxRate(e.target.value)} />
          </div>
        </div>

        <div className="chip-group" style={{ marginBottom: 20 }}>
          {['5', '12', '18', '28'].map(r => (
            <button key={r} className={`chip${taxRate === r ? ' active' : ''}`} onClick={() => setTaxRate(r)}>{r}% GST</button>
          ))}
        </div>

        <div className="result-card">
          <div className="result-label">{mode === 'exclusive' ? 'Total Price (Gross)' : 'Pre-Tax Price (Net)'}</div>
          <div className="result-main">
            {mode === 'exclusive' ? grossAmount.toFixed(2) : netAmount.toFixed(2)}
          </div>
          <div className="result-row">
            <span className="result-row-label">Total Tax Amount</span>
            <span className="result-row-value highlight">{gstAmount.toFixed(2)}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">CGST ({rate / 2}%)</span>
            <span className="result-row-value">{cgst.toFixed(2)}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">SGST / UTGST ({rate / 2}%)</span>
            <span className="result-row-value">{sgst.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
