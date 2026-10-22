import { useMemo } from 'react';
import { EXPERIENCE } from '../../data/portfolio';
import ChartCard from './ChartCard';
import useChartTooltip from './useChartTooltip.jsx';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function toMonthNumber(key) {
  const [year, month] = key.split('-').map(Number);
  return year * 12 + (month - 1);
}

function currentMonthNumber() {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

function formatMonthLabel(number) {
  const year = Math.floor(number / 12);
  const month = number % 12;
  return `${MONTH_NAMES[month]} '${String(year).slice(2)}`;
}

/**
 * A Gantt-style timeline of the roles on record.
 *
 * One series — a role's duration — so there is a single hue. The role that
 * is still running is emphasised; the completed ones sit back in a muted step
 * of the same ramp. Durations are labelled inside the bar where they fit, and
 * always repeat in the label column, the tooltip and the table view.
 */
export default function TimelineChart() {
  const { bind, tooltip } = useChartTooltip();

  const { rows, months, domainStart, total } = useMemo(() => {
    const now = currentMonthNumber();

    const items = EXPERIENCE.map((exp) => {
      const start = toMonthNumber(exp.start);
      const end = exp.ongoing ? now : toMonthNumber(exp.end);
      return {
        ...exp,
        start,
        end,
        months: end - start + 1,
        ongoing: Boolean(exp.ongoing),
      };
    }).sort((a, b) => b.start - a.start);

    const domainStart = Math.min(...items.map((item) => item.start));
    const domainEnd = Math.max(...items.map((item) => item.end));
    const total = domainEnd - domainStart + 1;

    return {
      rows: items,
      months: Array.from({ length: total }, (_, index) => domainStart + index),
      domainStart,
      total,
    };
  }, []);

  const table = (
    <div className="chart__table-wrap">
      <table className="chart__table">
        <caption className="sr-only">Roles, companies and durations</caption>
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">Company</th>
            <th scope="col">Period</th>
            <th scope="col">Length</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <th scope="row">{row.role}</th>
              <td>{row.company}</td>
              <td>{row.period}</td>
              <td>
                {row.months} {row.months === 1 ? 'month' : 'months'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <ChartCard
      title="Where the time went"
      subtitle="Every role on record, from the first freelance build to the one I’m in now."
      table={table}
      className="chart--wide"
    >
      <div className="timeline" style={{ '--tl-cols': months.length }}>
        <div className="timeline__row timeline__row--axis" aria-hidden="true">
          <span className="timeline__axis-spacer" />
          <div className="timeline__track">
            <div className="timeline__months">
              {months.map((number) => (
                <span key={number} className="timeline__month">
                  {formatMonthLabel(number)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {rows.map((row) => {
          const left = ((row.start - domainStart) / total) * 100;
          const width = (row.months / total) * 100;
          const showInside = row.months >= 2;

          return (
            <div key={row.id} className="timeline__row">
              <div className="timeline__label">
                <span className="timeline__role">{row.role}</span>
                <span className="timeline__company">{row.company}</span>
                <span className="timeline__period">
                  {row.period} · {row.months} {row.months === 1 ? 'month' : 'months'}
                </span>
              </div>

              <div className="timeline__track">
                <div className="timeline__grid" aria-hidden="true">
                  {months.map((number) => (
                    <span key={number} />
                  ))}
                </div>

                <div
                  className={`timeline__bar${row.ongoing ? ' timeline__bar--current' : ''}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  tabIndex={0}
                  {...bind(
                    <span>
                      <strong>{row.role}</strong>
                      {row.company}
                      <br />
                      {row.period}
                    </span>,
                  )}
                >
                  {showInside && (
                    <span className="timeline__bar-label">
                      {row.months} {row.months === 1 ? 'mo' : 'mos'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chart__key">
        <span className="chart__key-item">
          <span className="chart__swatch chart__swatch--current" aria-hidden="true" />
          Current role
        </span>
        <span className="chart__key-item">
          <span className="chart__swatch chart__swatch--past" aria-hidden="true" />
          Completed
        </span>
      </div>

      {tooltip}
    </ChartCard>
  );
}
