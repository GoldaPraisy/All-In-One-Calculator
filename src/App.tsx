import React, { useState } from 'react';

// Layout
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeDashboard from './components/HomeDashboard';

// Math
import BasicCalculator from './calculators/math/BasicCalculator';
import ScientificCalculator from './calculators/math/ScientificCalculator';
import GraphingCalculator from './calculators/math/GraphingCalculator';
import PercentageCalculator from './calculators/math/PercentageCalculator';
import FractionCalculator from './calculators/math/FractionCalculator';
import StatisticsCalculator from './calculators/math/StatisticsCalculator';
import ProbabilityCalculator from './calculators/math/ProbabilityCalculator';
import AlgebraCalculator from './calculators/math/AlgebraCalculator';

// Finance
import EMICalculator from './calculators/finance/EMICalculator';
import LoanCalculator from './calculators/finance/LoanCalculator';
import GSTCalculator from './calculators/finance/GSTCalculator';
import SimpleInterestCalculator from './calculators/finance/SimpleInterestCalculator';
import CompoundInterestCalculator from './calculators/finance/CompoundInterestCalculator';
import SavingsCalculator from './calculators/finance/SavingsCalculator';
import SalaryCalculator from './calculators/finance/SalaryCalculator';
import DiscountCalculator from './calculators/finance/DiscountCalculator';
import TipCalculator from './calculators/finance/TipCalculator';

// Health
import BMICalculator from './calculators/health/BMICalculator';
import AgeCalculator from './calculators/health/AgeCalculator';
import CalorieCalculator from './calculators/health/CalorieCalculator';

// Conversion
import UnitConverter from './calculators/conversion/UnitConverter';
import TemperatureCalculator from './calculators/conversion/TemperatureCalculator';
import CurrencyCalculator from './calculators/conversion/CurrencyCalculator';

// Date & Time
import DateDiffCalculator from './calculators/datetime/DateDiffCalculator';
import TimeCalculator from './calculators/datetime/TimeCalculator';

// Engineering
import PhysicsCalculator from './calculators/engineering/PhysicsCalculator';
import ElectricalCalculator from './calculators/engineering/ElectricalCalculator';
import ConstructionCalculator from './calculators/engineering/ConstructionCalculator';

// Programming
import ProgrammerCalculator from './calculators/programming/ProgrammerCalculator';
import BaseCalculator from './calculators/programming/BaseCalculator';
import MatrixCalculator from './calculators/programming/MatrixCalculator';

// Advanced
import DerivativeCalculator from './calculators/advanced/DerivativeCalculator';
import IntegralCalculator from './calculators/advanced/IntegralCalculator';
import EquationSolver from './calculators/advanced/EquationSolver';
import GeometryCalculator from './calculators/advanced/GeometryCalculator';

export default function App() {
  const [activeCalcId, setActiveCalcId] = useState<string>('home');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const renderCalculator = () => {
    switch (activeCalcId) {
      case 'home': return <HomeDashboard onSelectCalc={setActiveCalcId} />;

      // Math
      case 'basic': return <BasicCalculator />;
      case 'scientific': return <ScientificCalculator />;
      case 'graphing': return <GraphingCalculator />;
      case 'percentage': return <PercentageCalculator />;
      case 'fraction': return <FractionCalculator />;
      case 'statistics': return <StatisticsCalculator />;
      case 'probability': return <ProbabilityCalculator />;
      case 'algebra': return <AlgebraCalculator />;

      // Finance
      case 'emi': return <EMICalculator />;
      case 'loan': return <LoanCalculator />;
      case 'gst': return <GSTCalculator />;
      case 'simple-interest': return <SimpleInterestCalculator />;
      case 'compound-interest': return <CompoundInterestCalculator />;
      case 'savings': return <SavingsCalculator />;
      case 'salary': return <SalaryCalculator />;
      case 'discount': return <DiscountCalculator />;
      case 'tip': return <TipCalculator />;

      // Health
      case 'bmi': return <BMICalculator />;
      case 'age': return <AgeCalculator />;
      case 'calorie': return <CalorieCalculator />;

      // Conversion
      case 'length': return <UnitConverter type="length" title="Length Converter" icon="📏" />;
      case 'weight': return <UnitConverter type="weight" title="Weight Converter" icon="⚖️" />;
      case 'temperature': return <TemperatureCalculator />;
      case 'area': return <UnitConverter type="area" title="Area Converter" icon="▪️" />;
      case 'volume': return <UnitConverter type="volume" title="Volume Converter" icon="🧊" />;
      case 'speed': return <UnitConverter type="speed" title="Speed Converter" icon="💨" />;
      case 'currency': return <CurrencyCalculator />;

      // Date & Time
      case 'date-diff': return <DateDiffCalculator />;
      case 'time-calc': return <TimeCalculator />;
      case 'age-detail': return <AgeCalculator />;

      // Engineering
      case 'physics': return <PhysicsCalculator />;
      case 'electrical': return <ElectricalCalculator />;
      case 'construction': return <ConstructionCalculator />;

      // Programming
      case 'binary': return <BaseCalculator base={2} title="Binary Calculator" icon="0️⃣" />;
      case 'hexadecimal': return <BaseCalculator base={16} title="Hexadecimal Calculator" icon="🔢" />;
      case 'octal': return <BaseCalculator base={8} title="Octal Calculator" icon="8️⃣" />;
      case 'programmer': return <ProgrammerCalculator />;
      case 'matrix': return <MatrixCalculator />;

      // Advanced
      case 'derivative': return <DerivativeCalculator />;
      case 'integral': return <IntegralCalculator />;
      case 'equation-solver': return <EquationSolver />;
      case 'geometry': return <GeometryCalculator />;

      default: return <HomeDashboard onSelectCalc={setActiveCalcId} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeCalcId={activeCalcId}
        onSelectCalc={setActiveCalcId}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className={`main-content${collapsed ? ' sidebar-collapsed' : ''}`}>
        <Header
          activeCalcId={activeCalcId}
          onSelectCalc={setActiveCalcId}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onToggleMobile={() => setMobileOpen(true)}
        />

        <div className="page-content">
          {renderCalculator()}
        </div>
      </main>
    </div>
  );
}
