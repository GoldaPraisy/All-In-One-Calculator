import { useState } from 'react';
import { WORLD_CURRENCIES } from '../../data/unitData';

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState('100');
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('INR');

  const amt = parseFloat(amount) || 0;

  const fromCurr = WORLD_CURRENCIES.find(c => c.code === fromCode) || WORLD_CURRENCIES[1]; // USD default
  const toCurr = WORLD_CURRENCIES.find(c => c.code === toCode) || WORLD_CURRENCIES[0]; // INR default

  // Convert via base USD
  const inUsd = amt / fromCurr.rate;
  const converted = inUsd * toCurr.rate;
  const unitRate = toCurr.rate / fromCurr.rate;

  const swap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };


  // Popular currencies for comparison
  const POPULAR_CODES = ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'AED', 'SAR'];
  const popularList = WORLD_CURRENCIES.filter(c => POPULAR_CODES.includes(c.code) && c.code !== fromCode);

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">💱</span>
        <div>
          <div className="calc-page-title">Global Currency Converter</div>
          <div className="calc-page-desc">Convert across 65+ world currencies with flags, symbols, and multi-currency comparison</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Amount to Convert</label>
          <input
            className="form-input"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ fontSize: '1.4rem', fontFamily: 'var(--font-mono)' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">From Currency</label>
            <select className="form-select" value={fromCode} onChange={e => setFromCode(e.target.value)}>
              {WORLD_CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.country} - {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          <button className="action-btn action-btn-secondary" style={{ padding: '10px 14px', marginTop: 18 }} onClick={swap} title="Swap Currencies">
            ⇄
          </button>

          <div className="form-group">
            <label className="form-label">To Currency</label>
            <select className="form-select" value={toCode} onChange={e => setToCode(e.target.value)}>
              {WORLD_CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.country} - {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-card" style={{ marginBottom: 24 }}>
          <div className="result-label">
            {fromCurr.flag} {amt} {fromCurr.code} equals
          </div>
          <div className="result-main" style={{ fontSize: '2.2rem' }}>
            {toCurr.flag} {toCurr.symbol} {converted.toLocaleString('en-US', { maximumFractionDigits: 2 })} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{toCurr.code}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Exchange Rate</span>
            <span className="result-row-value">1 {fromCurr.code} = {unitRate.toFixed(4)} {toCurr.code}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Inverse Rate</span>
            <span className="result-row-value">1 {toCode} = {(1 / unitRate).toFixed(4)} {fromCode}</span>
          </div>
        </div>

        <h4 style={{ marginBottom: 12, color: 'var(--electric-blue)' }}>⚡ Quick Conversion to Major Currencies</h4>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Country / Region</th>
                <th>Currency</th>
                <th>Code</th>
                <th>Converted Amount</th>
              </tr>
            </thead>
            <tbody>
              {popularList.map(c => {
                const val = inUsd * c.rate;
                return (
                  <tr key={c.code} style={{ cursor: 'pointer' }} onClick={() => setToCode(c.code)}>
                    <td>{c.flag} {c.country}</td>
                    <td>{c.name}</td>
                    <td><span className="chip" style={{ padding: '2px 8px' }}>{c.code}</span></td>
                    <td style={{ color: 'var(--electric-blue)', fontWeight: 600 }}>
                      {c.symbol} {val.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
