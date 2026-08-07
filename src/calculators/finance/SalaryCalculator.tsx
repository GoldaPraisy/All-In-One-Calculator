import React, { useState } from 'react';

export default function SalaryCalculator() {
  const [grossAnnual, setGrossAnnual] = useState('600000');
  const [taxDeductionPct, setTaxDeductionPct] = useState('10');
  const [pfDeductionPct, setPfDeductionPct] = useState('5');
  const [otherDeductions, setOtherDeductions] = useState('0');

  const gross = parseFloat(grossAnnual) || 0;
  const taxPct = parseFloat(taxDeductionPct) || 0;
  const pfPct = parseFloat(pfDeductionPct) || 0;
  const other = parseFloat(otherDeductions) || 0;

  const annualTax = (gross * taxPct) / 100;
  const annualPf = (gross * pfPct) / 100;
  const totalAnnualDeductions = annualTax + annualPf + (other * 12);
  const netAnnualSalary = Math.max(0, gross - totalAnnualDeductions);

  const monthlyGross = gross / 12;
  const monthlyTax = annualTax / 12;
  const monthlyPf = annualPf / 12;
  const monthlyTakeHome = netAnnualSalary / 12;

  return (
    <div className="fade-in">
      <div className="calc-page-header">
        <span className="calc-page-icon">💼</span>
        <div>
          <div className="calc-page-title">Salary & Take-Home Calculator</div>
          <div className="calc-page-desc">Estimate gross salary to net take-home salary after taxes and deductions</div>
        </div>
      </div>

      <div className="calc-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Gross Annual Salary (CTC)</label>
            <input className="form-input" type="number" value={grossAnnual} onChange={e => setGrossAnnual(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Income Tax (%)</label>
            <input className="form-input" type="number" step="0.5" value={taxDeductionPct} onChange={e => setTaxDeductionPct(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">EPF / PF Deduction (%)</label>
            <input className="form-input" type="number" step="0.5" value={pfDeductionPct} onChange={e => setPfDeductionPct(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Other Monthly Deductions</label>
            <input className="form-input" type="number" value={otherDeductions} onChange={e => setOtherDeductions(e.target.value)} />
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">Monthly Take-Home Salary</div>
          <div className="result-main">{Math.round(monthlyTakeHome).toLocaleString()}</div>
          <div className="result-row">
            <span className="result-row-label">Monthly Gross</span>
            <span className="result-row-value">{Math.round(monthlyGross).toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Monthly Tax Deduction</span>
            <span className="result-row-value">{Math.round(monthlyTax).toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Monthly PF Contribution</span>
            <span className="result-row-value">{Math.round(monthlyPf).toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Annual Net Take-Home</span>
            <span className="result-row-value highlight">{Math.round(netAnnualSalary).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
