import { CATEGORIES, ALL_CALCS } from '../data/categories';

interface Props {
  onSelectCalc: (id: string) => void;
}

export default function HomeDashboard({ onSelectCalc }: Props) {
  return (
    <div className="fade-in">
      <div className="home-hero">
        <h1 className="home-hero-title">ALL-IN-ONE CALCULATOR</h1>
        <p className="home-hero-sub">
          {ALL_CALCS.length} powerful, precision calculators designed for Math, Finance, Health, Engineering, Programming, and Unit Conversions.
        </p>

        <div className="home-stats">
          <div className="home-stat">
            <div className="home-stat-num">{ALL_CALCS.length}</div>
            <div className="home-stat-label">Calculators</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-num">7</div>
            <div className="home-stat-label">Categories</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-num">100%</div>
            <div className="home-stat-label">Free & Offline</div>
          </div>
        </div>
      </div>

      <div className="category-grid">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="category-card" onClick={() => onSelectCalc(cat.calcs[0].id)}>
            <span className="category-card-icon">{cat.icon}</span>
            <div className="category-card-name">{cat.name}</div>
            <div className="category-card-count">{cat.calcs.length} Calculators Available</div>

            <div className="category-card-items">
              {cat.calcs.map(calc => (
                <span
                  key={calc.id}
                  className="category-chip"
                  onClick={e => {
                    e.stopPropagation();
                    onSelectCalc(calc.id);
                  }}
                >
                  {calc.icon} {calc.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
