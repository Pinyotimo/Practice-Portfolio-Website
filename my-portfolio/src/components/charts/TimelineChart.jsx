import { useMemo } from 'react';
import { EXPERIENCE } from '../../data/portfolio';
import ChartCard from './ChartCard';
import useChartTooltip from './useChartTooltip.jsx';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* One colour per kind of engagement, so the chart reads as "what sort of
   work" at a glance. The label column repeats the kind as an icon chip and
   the legend names it, so identity never rests on colour alone. */
const KINDS = {
  work: { label: 'Work', color: 'var(--chart-1)', ink: 'var(--chart-1-ink)' },
  award: { label: 'Hackathon', color: 'var(--chart-2)', ink: 'var(--chart-2-ink)' },
  freelance: { label: 'Freelance', color: 'var(--chart-3)', ink: 'var(--chart-3-ink)' },
};

const kindOf = (row) => KINDS[row.kind] ?? KINDS.work;

function toMonthNumber(key) {
  const [year, month] = key.split('-').map(Number);
  return year * 12 + (month - 1);
}

function currentMonthNumber() {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

const monthName = (number) => MONTH_NAMES[number % 12];
const yearOf = (number) => Math.floor(number / 12);

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/**
 * A Gantt-style timeline of the roles on record, coloured by kind of
 * engagement, with a summary strip above and a live marker on the role that
 * is still running.
 */
export default function TimelineChart() {
  const { bind, tooltip } = useChartTooltip();

  const { rows, months, domainStart, total, current } = useMemo(() => {
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
      current: items.find((item) => item.ongoing),
    };
  }, []);

  const kindCounts = Object.fromEntries(
    Object.keys(KINDS).map((key) => [key, rows.filter((row) => (row.kind ?? 'work') === key).length]),
  );

  const summary = [
    { value: total, unit: 'months', label: 'On record' },
    { value: rows.length, unit: rows.length === 1 ? 'role' : 'roles', label: 'Engagements' },
    { value: kindCounts.award, unit: 'events', label: 'Hackathons' },
  ];

  const table = (
    <div className="chart__table-wrap">
      <table className="chart__table chart__table--stack">
        <caption className="sr-only">Roles, companies and durations</caption>
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">Company</th>
            <th scope="col">Kind</th>
            <th scope="col">Period</th>
            <th scope="col">Length</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <th scope="row">{row.role}</th>
              <td data-label="Company">{row.company}</td>
              <td data-label="Kind">{kindOf(row).label}</td>
              <td data-label="Period">{row.period}</td>
              <td data-label="Length">{plural(row.months, 'month')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const legend = (
    <>
      {Object.entries(KINDS).map(([key, kind]) => (
        <span key={key} className="chart__key-item">
          <span className="chart__swatch" style={{ background: kind.color }} aria-hidden="true" />
          {kind.label}
        </span>
      ))}
      <span className="chart__key-item">
        <span className="timeline__live-dot" aria-hidden="true" />
        Ongoing
      </span>
    </>
  );

  return (
    <ChartCard
      title="Where the time went"
      subtitle="Every role on record, from the first freelance build to the one I’m in now."
      legend={legend}
      table={table}
      className="chart--wide chart--timeline"
    >
      {/* Summary strip */}
      <div className="tl-summary">
        {summary.map((item) => (
          <div key={item.label} className="tl-summary__item">
            <span className="tl-summary__label">{item.label}</span>
            <span className="tl-summary__value">
              <strong>{item.value}</strong> {item.unit}
            </span>
          </div>
        ))}
        {current && (
          <div className="tl-summary__item tl-summary__item--now">
            <span className="tl-summary__label">
              <span className="timeline__live-dot" aria-hidden="true" /> Right now
            </span>
            <span className="tl-summary__value">
              <strong>{current.role}</strong> · {current.company}
            </span>
          </div>
        )}
      </div>

      <div className="timeline" style={{ '--tl-cols': months.length }}>
        <div className="timeline__row timeline__row--axis" aria-hidden="true">
          <span className="timeline__axis-spacer" />
          <div className="timeline__track">
            <div className="timeline__months">
              {months.map((number, i) => {
                const newYear = i === 0 || number % 12 === 0;
                return (
                  <span key={number} className={`timeline__month${newYear ? ' is-year' : ''}`}>
                    {newYear && <em>{yearOf(number)}</em>}
                    {monthName(number)}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {rows.map((row) => {
          const kind = kindOf(row);
          const left = ((row.start - domainStart) / total) * 100;
          const width = (row.months / total) * 100;
          const showInside = row.months >= 2;

          return (
            <div
              key={row.id}
              className={`timeline__row${row.ongoing ? ' is-ongoing' : ''}`}
              style={{ '--kind': kind.color, '--kind-ink': kind.ink }}
            >
              <div className="timeline__label">
                <span className="timeline__icon" aria-hidden="true">
                  <i className={row.icon ?? 'fa-solid fa-briefcase'} />
                </span>
                <span className="timeline__text">
                  <span className="timeline__role">{row.role}</span>
                  <span className="timeline__company">{row.company}</span>
                  <span className="timeline__period">
                    {row.period} · {plural(row.months, 'month')}
                  </span>
                </span>
              </div>

              <div className="timeline__track">
                <div className="timeline__grid" aria-hidden="true">
                  {months.map((number) => (
                    <span key={number} className={number % 12 === 0 ? 'is-year' : undefined} />
                  ))}
                </div>

                <div
                  className={`timeline__bar${row.ongoing ? ' timeline__bar--current' : ''}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  tabIndex={0}
                  {...bind(
                    <span>
                      <strong>{row.role}</strong>
                      {row.company} · {kind.label}
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
                  {row.ongoing && <span className="timeline__now" aria-hidden="true">Now</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {tooltip}
    </ChartCard>
  );
}
