import { useMemo } from 'react';
import { DISCIPLINES, PROJECT_STACK_ROWS } from '../../data/portfolio';
import ChartCard from './ChartCard';
import useChartTooltip from './useChartTooltip.jsx';

const SERIES = [DISCIPLINES.frontend, DISCIPLINES.backend, DISCIPLINES.data];

/**
 * How the technologies behind the shipped projects are distributed.
 *
 * Part-to-whole per project, so each bar is stacked by discipline. Three
 * series means three categorical slots, assigned in a fixed order and never
 * recycled, with a legend and a table view so identity never rests on colour
 * alone.
 */
export default function StackChart() {
  const { bind, tooltip } = useChartTooltip();

  const { rows, max } = useMemo(() => {
    const sorted = [...PROJECT_STACK_ROWS].sort((a, b) => b.total - a.total);
    return {
      rows: sorted,
      max: Math.max(...sorted.map((row) => row.total)),
    };
  }, []);

  const table = (
    <div className="chart__table-wrap">
      <table className="chart__table chart__table--stack">
        <caption className="sr-only">Technologies used per project, by discipline</caption>
        <thead>
          <tr>
            <th scope="col">Project</th>
            {SERIES.map((series) => (
              <th key={series.key} scope="col">
                {series.label}
              </th>
            ))}
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <th scope="row">{row.title}</th>
              {SERIES.map((series) => (
                <td key={series.key} data-label={series.label}>
                  {row.counts[series.key]}
                </td>
              ))}
              <td data-label="Total">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const legend = (
    <>
      {SERIES.map((series) => (
        <span key={series.key} className="chart__key-item">
          <span
            className="chart__swatch"
            style={{ background: series.color }}
            aria-hidden="true"
          />
          {series.label}
        </span>
      ))}
    </>
  );

  return (
    <ChartCard
      title="Where the stack sits"
      subtitle="Technologies behind each shipped project, grouped by the kind of work they do."
      legend={legend}
      table={table}
    >
      <div className="stack">
        {rows.map((row) => (
          <div key={row.id} className="stack__row">
            <span className="stack__name">{row.title}</span>

            <div className="stack__track">
              <div className="stack__bar" style={{ width: `${(row.total / max) * 100}%` }}>
                {SERIES.map((series) => {
                  const count = row.counts[series.key];
                  if (!count) return null;

                  return (
                    <span
                      key={series.key}
                      className="stack__segment"
                      style={{
                        flexGrow: count,
                        background: series.color,
                      }}
                      tabIndex={0}
                      {...bind(
                        <span>
                          <strong>{row.title}</strong>
                          {series.label}: {count}
                          <br />
                          {row.total} technolog{row.total === 1 ? 'y' : 'ies'} in total
                        </span>,
                      )}
                    >
                      {count >= 2 && (
                        <span className="stack__segment-label" style={{ color: series.ink }}>
                          {count}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            <span className="stack__total">{row.total}</span>
          </div>
        ))}
      </div>

      {tooltip}
    </ChartCard>
  );
}
