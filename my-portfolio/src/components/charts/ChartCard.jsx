import { useId, useState } from 'react';
import './charts.css';

/**
 * Frame for every chart on the page: a title, an optional lede, an optional
 * legend, and a table view so no value is reachable only by hovering.
 */
export default function ChartCard({
  title,
  subtitle,
  legend,
  children,
  table,
  className = '',
}) {
  const [showTable, setShowTable] = useState(false);
  const bodyId = useId();

  return (
    <figure className={`chart ${className}`}>
      <figcaption className="chart__head">
        <div className="chart__heading">
          <h3 className="chart__title">{title}</h3>
          {subtitle && <p className="chart__subtitle">{subtitle}</p>}
        </div>

        {table && (
          <button
            type="button"
            className="chart__toggle"
            onClick={() => setShowTable((value) => !value)}
            aria-expanded={showTable}
            aria-controls={bodyId}
          >
            <i
              className={showTable ? 'fa-solid fa-chart-simple' : 'fa-solid fa-table-list'}
              aria-hidden="true"
            />
            {showTable ? 'Chart' : 'Table'}
          </button>
        )}
      </figcaption>

      {legend && !showTable && <div className="chart__legend">{legend}</div>}

      <div className="chart__body" id={bodyId}>
        {showTable && table ? table : children}
      </div>
    </figure>
  );
}
