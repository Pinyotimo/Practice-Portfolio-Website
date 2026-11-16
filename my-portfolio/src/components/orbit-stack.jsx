/* ==========================================================================
   OrbitStack — the hero centrepiece.

   A cover-flow ring of tool cards. The rotation is owned by a single number
   and written straight to the DOM with rAF (no animation library in the hot
   path), so the pile stays smooth and the depth ordering is exact.

   For each card the code solves where it sits on the ring for the current
   rotation: `x` across, `z` toward or away from the viewer. Scale, opacity
   and z-index all come from that `z`, which is what makes the stack read as
   a solid 3D object rather than a row of cards.

   Interaction: drag to spin, click a card to bring it to the front, arrow
   keys to move through the list. Reduced motion renders the resting stack.
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import './orbit-stack.css';

const DRAG_PER_PX = 0.4;
const SPRING = 90;
const FRICTION = 0.955;

/** Ring geometry as a fraction of the stage width. */
const RADIUS = 0.34;

export default function OrbitStack({ tools, className = '' }) {
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(tools[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(600);

  /* One number drives everything: degrees of ring rotation. */
  const angle = useRef(0);
  const target = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(null);
  const stageRef = useRef(null);
  const spinnerRef = useRef(null);
  const cardRefs = useRef([]);

  const activeIndex = Math.max(0, tools.indexOf(active));
  const radius = Math.min(width * RADIUS, 250);
  const step = 360 / tools.length;

  /* Track the stage width so the ring scales with the viewport. */
  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Write the ring's rotation and every card's derived transform. */
  const render = useCallback(() => {
    const spinner = spinnerRef.current;
    if (spinner) spinner.style.transform = `rotateY(${angle.current.toFixed(3)}deg)`;

    const cards = cardRefs.current;
    for (let i = 0; i < cards.length; i += 1) {
      const node = cards[i];
      if (!node) continue;

      const cardAngle = i * step + angle.current;
      const radians = (cardAngle * Math.PI) / 180;
      const x = Math.sin(radians);
      const z = Math.cos(radians);
      const scale = 0.6 + 0.4 * ((z + 1) / 2);
      /* Keep every card readable: the back of the ring dims, it never
         disappears into the page background. */
      const opacity = 0.55 + 0.45 * ((z + 1) / 2);
      const lift = (z + 1) * 9;

      node.style.transform = `translate3d(calc(-50% + ${(x * radius).toFixed(2)}px), ${lift.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      node.style.opacity = opacity.toFixed(3);
      node.style.zIndex = String(Math.round(z * 100) + 100);
    }
  }, [radius, step]);

  /* The animation loop: spring toward the target, drift when idle. */
  useEffect(() => {
    if (reduceMotion) {
      angle.current = target.current;
      render();
      return undefined;
    }

    let frame;
    let last = performance.now();

    const tick = (now) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!dragging.current) {
        /* Idle drift, decaying to the nearest resting point. */
        velocity.current *= Math.pow(FRICTION, delta * 60);
        target.current += velocity.current * delta * 60;
        if (Math.abs(velocity.current) < 0.02) {
          velocity.current = 0;
          /* Ease the target toward the selected card. */
          const wanted = -activeIndex * step;
          target.current += (wanted - target.current) * Math.min(1, delta * 2.4);
        }
        /* Critically-damped spring from angle to target. */
        const pull = (target.current - angle.current) * SPRING * delta;
        angle.current += pull * delta * 4;
      }

      render();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, activeIndex, step, render]);

  /* Clicking a card turns the ring to bring it to the front. */
  useEffect(() => {
    target.current = -activeIndex * step;
    velocity.current = 0;
  }, [activeIndex, step]);

  const onKeyDown = (event) => {
    let next = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (activeIndex + 1) % tools.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (activeIndex - 1 + tools.length) % tools.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tools.length - 1;
    else return;

    event.preventDefault();
    setActive(tools[next]);
  };

  const onPointerDown = useCallback((event) => {
    if (event.button !== 0) return;
    dragging.current = { id: event.pointerId, startX: event.clientX, startAngle: angle.current };
    velocity.current = 0;
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event) => {
    const drag = dragging.current;
    if (!drag || drag.id !== event.pointerId) return;
    const next = drag.startAngle - (event.clientX - drag.startX) * DRAG_PER_PX;
    angle.current = next;
    target.current = next;
    velocity.current = 0;
  }, []);

  const endDrag = useCallback((event) => {
    if (dragging.current?.id !== event.pointerId) return;
    dragging.current = null;
    setIsDragging(false);
  }, []);

  /* Pause the loop when the hero is off screen. */
  useEffect(() => {
    if (reduceMotion) return undefined;
    let frame;
    const tick = () => {
      render();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [render, reduceMotion]);

  return (
    <div
      className={`orbit${className ? ` ${className}` : ''}${isDragging ? ' is-dragging' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      role="listbox"
      aria-label="Tools I work with"
      aria-orientation="horizontal"
      tabIndex={0}
    >
      <div className="orbit__stage" ref={stageRef}>
        <div className="orbit__ring" aria-hidden="true" />

        <div className="orbit__plane">
          <div className="orbit__spinner" ref={spinnerRef}>
            {tools.map((tool, index) => (
              <button
                key={tool}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                type="button"
                className={`orbit-card${tool === active ? ' is-active' : ''}`}
                onClick={() => setActive(tool)}
                tabIndex={tool === active ? 0 : -1}
                aria-label={`${tool}. Card ${index + 1} of ${tools.length}.`}
                aria-pressed={tool === active}
              >
                <span className="orbit-card__face">
                  <span className="orbit-card__name">{tool}</span>
                  <span className="orbit-card__index">{String(index + 1).padStart(2, '0')}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="orbit__core" aria-hidden="true">
          <span className="orbit__core-disc" />
          <span className="orbit__core-dot" />
        </div>
      </div>

      <p className="orbit__caption" aria-hidden="true">
        <span className="orbit__caption-count">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="orbit__caption-sep">/</span>
        <span>{String(tools.length).padStart(2, '0')}</span>
        <span className="orbit__caption-label">{active}</span>
      </p>
    </div>
  );
}
