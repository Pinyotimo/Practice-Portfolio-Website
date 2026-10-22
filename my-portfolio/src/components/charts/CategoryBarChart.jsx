import { useMemo } from 'react';
import { CERT_AREAS } from '../../data/portfolio';
import ChartCard from './ChartCard';
import useChartTooltip from './useChartTooltip.jsx';

/**
 * Certifications by area.
 *
 * One series over nominal categories, so every bar wears the same hue — bar
 * length already carries the value, and colouring by value would spend the
 * identity channel twice. A single series needs no legend; the title names it.
 */
export default function CategoryBarChart() {
  const { bind, tooltip } = useChartTooltip();

  const { rows, max } = useMemo(() => {
    const sorted = [...CERT_AREAS].sort((a, b) => b.count - a.count);
    return { rows: sorted, max: Math.max(...sorted.map((row) => row.count)) };
  }, []);

  const table = (
    <div className="chart__table-wrap">
      <table className="chart__table">
        <caption className="sr-only">Number of certifications per area</caption>
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Certificates</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.area}>
              <th scope="row">{row.area}</th>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <ChartCard
      title="Certifications by area"
      subtitle="Nine certificates across five disciplines."
      table={table}
    >
      <div className="bars">
        {rows.map((row) => (
          <div key={row.area} className="bars__row">
            <span className="bars__name">{row.area}</span>
            <div className="bars__track">
              <div
                className="bars__bar"
                style={{ width: `${(row.count / max) * 100}%` }}
                tabIndex={0}
                {...bind(
                  <span>
                    <strong>{row.area}</strong>
                    {row.count} certificate{row.count === 1 ? '' : 's'}
                  </span>,
                )}
              >
                <span className="bars__value">{row.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tooltip}
    </ChartCard>
  );
}
