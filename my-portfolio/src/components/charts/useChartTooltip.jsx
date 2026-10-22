import { useCallback, useState } from 'react';

/**
 * A single tooltip for a chart body.
 *
 * Returns the props to spread onto a mark and the tooltip element to render.
 * The tooltip is positioned against the chart body, so it works for SVG-free
 * HTML charts as well as plain divs.
 */
export default function useChartTooltip() {
  const [tip, setTip] = useState(null);

  const show = useCallback((event, content) => {
    const container = event.currentTarget.closest('.chart__body');
    if (!container) return;

    const mark = event.currentTarget.getBoundingClientRect();
    const bounds = container.getBoundingClientRect();

    setTip({
      content,
      left: mark.left - bounds.left + mark.width / 2,
      top: mark.top - bounds.top,
    });
  }, []);

  const hide = useCallback(() => setTip(null), []);

  const bind = useCallback(
    (content) => ({
      onMouseEnter: (event) => show(event, content),
      onMouseLeave: hide,
      onFocus: (event) => show(event, content),
      onBlur: hide,
    }),
    [show, hide],
  );

  const tooltip = tip ? (
    <div
      className="chart__tooltip"
      style={{ left: tip.left, top: tip.top }}
      role="presentation"
    >
      {tip.content}
    </div>
  ) : null;

  return { bind, tooltip, hide };
}
