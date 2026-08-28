import { CATEGORIES } from '../data/categories';

interface Props {
  activeCalcId: string;
  onSelectCalc: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  searchTerm: string;
  onSearchChange: (s: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  activeCalcId,
  onSelectCalc,
  collapsed,
  searchTerm,
  onSearchChange,
  mobileOpen,
  onCloseMobile,
}: Props) {
  return (
    <>
      <div
        className={`sidebar-overlay${mobileOpen ? ' visible' : ''}`}
        onClick={onCloseMobile}
      />
      <aside className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
        <div className="sidebar-logo" onClick={() => onSelectCalc('home')} style={{ cursor: 'pointer' }}>
          <img
            src="/calc-icon.png"
            alt="All-in-One Calculator"
            className="sidebar-logo-icon"
            style={{
              width: 72,
              height: 72,
              objectFit: 'contain',
              flexShrink: 0,
              filter: 'drop-shadow(0 0 12px #00bfff)',
            }}
          />
          {!collapsed && (
            <div className="sidebar-logo-text">
              ALL-IN-ONE
              <span>CALCULATOR</span>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="sidebar-search">
            <input
              type="text"
              placeholder="🔍 Search 42+ calculators..."
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
        )}

        <nav className="sidebar-nav">
          <div
            className={`sidebar-item${activeCalcId === 'home' ? ' active' : ''}`}
            onClick={() => { onSelectCalc('home'); onCloseMobile(); }}
            style={{ paddingLeft: collapsed ? 18 : 24 }}
          >
            <span className="sidebar-category-icon">🏠</span>
            {!collapsed && <span>Home Dashboard</span>}
          </div>

          {CATEGORIES.map(cat => {
            const matches = cat.calcs.filter(c =>
              c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.desc.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm && matches.length === 0) return null;

            return (
              <div key={cat.id} className="sidebar-category">
                {!collapsed && (
                  <div className="sidebar-category-header">
                    <span className="sidebar-category-icon">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                )}
                {(searchTerm ? matches : cat.calcs).map(calc => (
                  <div
                    key={calc.id}
                    className={`sidebar-item${activeCalcId === calc.id ? ' active' : ''}`}
                    onClick={() => { onSelectCalc(calc.id); onCloseMobile(); }}
                    title={calc.name}
                    style={{ paddingLeft: collapsed ? 18 : 36 }}
                  >
                    <span className="sidebar-category-icon">{calc.icon}</span>
                    {!collapsed && <span>{calc.name}</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
