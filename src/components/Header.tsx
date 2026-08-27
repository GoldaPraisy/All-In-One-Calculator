import { ALL_CALCS, CATEGORIES } from '../data/categories';

interface Props {
  activeCalcId: string;
  onSelectCalc: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onToggleMobile: () => void;
}

export default function Header({
  activeCalcId,
  onSelectCalc,
  collapsed,
  onToggleCollapse,
  onToggleMobile,
}: Props) {
  const currentCalc = ALL_CALCS.find(c => c.id === activeCalcId);
  const currentCat = currentCalc ? CATEGORIES.find(c => c.id === currentCalc.categoryId) : null;

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleCollapse} title="Toggle Sidebar">
          {collapsed ? '➔' : '☰'}
        </button>
        <button className="sidebar-toggle" onClick={onToggleMobile} style={{ display: 'none' }}>
          ☰
        </button>

        <div className="breadcrumb">
          <span style={{ cursor: 'pointer' }} onClick={() => onSelectCalc('home')}>
            Home
          </span>
          {currentCat && (
            <>
              <span>/</span>
              <span>{currentCat.name}</span>
            </>
          )}
          {currentCalc && (
            <>
              <span>/</span>
              <span className="breadcrumb-active">{currentCalc.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="header-right">
        <span className="header-badge">42 CALCULATORS</span>
      </div>
    </header>
  );
}
