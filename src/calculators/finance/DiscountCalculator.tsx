import React, { useState } from 'react';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('100');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [taxPercent, setTaxPercent] = useState('0');

  const price = parseFloat(originalPrice) || 0;
  const disc = parseFloat(discountPercent) || 0;
  const tax = parseFloat(taxPercent) || 0;

  const discountAmount = (price * disc) / 100;
  const priceAfterDiscount = price - discountAmount;
  const taxAmount = (priceAfterDiscount * tax) / 100;
  const finalPrice = priceAfterDiscount + taxAmount;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">🏷️</span>
        <div>
          <div className="calc-page-title">Discount Calculator</div>
          <div className="calc-page-desc">Calculate sale price, total savings, and final price including tax</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 500, margin: '0 auto' }}>
        <div className="form-grid form-grid-3" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Original Price</label>
            <input className="form-input" type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Discount (%)</label>
            <input className="form-input" type="number" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Sales Tax (%)</label>
            <input className="form-input" type="number" value={taxPercent} onChange={e => setTaxPercent(e.target.value)} />
          </div>
        </div>

        <div className="chip-group" style={{ marginBottom: 20 }}>
          {['10', '15', '20', '25', '30', '50'].map(d => (
            <button key={d} className={`chip${discountPercent === d ? ' active' : ''}`} onClick={() => setDiscountPercent(d)}>{d}% Off</button>
          ))}
        </div>

        <div className="result-card">
          <div className="result-label">Final Payable Price</div>
          <div className="result-main">{finalPrice.toFixed(2)}</div>
          <div className="result-row">
            <span className="result-row-label">You Save</span>
            <span className="result-row-value highlight">{discountAmount.toFixed(2)} ({disc}%)</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Price After Discount</span>
            <span className="result-row-value">{priceAfterDiscount.toFixed(2)}</span>
          </div>
          {tax > 0 && (
            <div className="result-row">
              <span className="result-row-label">Estimated Tax</span>
              <span className="result-row-value">{taxAmount.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
