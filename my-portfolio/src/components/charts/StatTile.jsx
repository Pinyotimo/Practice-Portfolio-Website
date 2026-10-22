/**
 * A single headline number.
 *
 * Proportional figures on the value (tabular-nums makes large numbers look
 * loose) and a sentence-case label underneath.
 */
export default function StatTile({ value, label, note, icon }) {
  return (
    <div className="stat-tile">
      {icon && (
        <span className="stat-tile__icon" aria-hidden="true">
          <i className={icon} />
        </span>
      )}
      <span className="stat-tile__value">{value}</span>
      <span className="stat-tile__label">{label}</span>
      {note && <span className="stat-tile__note">{note}</span>}
    </div>
  );
}
