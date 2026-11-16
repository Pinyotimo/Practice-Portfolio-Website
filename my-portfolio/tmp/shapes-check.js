// src/lib/shapes.jsx
import { useMemo } from "react";
function seedFrom(text) {
  const key = String(text ?? "");
  let h = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}
function makeRng(seed) {
  let state = Math.floor(seed * 4294967295) >>> 0;
  return () => {
    state = Math.imul(state, 1664525) + 1013904223 >>> 0;
    return state / 4294967296;
  };
}
var SHAPE_FAMILIES = [
  "orbital",
  "lattice",
  "flow",
  "stack",
  "burst",
  "weave",
  "prism",
  "ring"
];
var FAMILY_LABEL = {
  orbital: "Orbital",
  lattice: "Lattice",
  flow: "Flow",
  stack: "Stack",
  burst: "Burst",
  weave: "Weave",
  prism: "Prism",
  ring: "Ring"
};
function familyFor(text) {
  const index = Math.floor(seedFrom(text) * SHAPE_FAMILIES.length) % SHAPE_FAMILIES.length;
  return SHAPE_FAMILIES[index];
}
function paletteFor(text) {
  const roles = ["--chart-1", "--chart-2", "--chart-3"];
  const index = Math.floor(seedFrom(`${text}:role`) * roles.length) % roles.length;
  return {
    primary: roles[index],
    secondary: roles[(index + 1) % roles.length],
    tertiary: roles[(index + 2) % roles.length]
  };
}
var TAU = Math.PI * 2;
function polar(cx, cy, radius, angle) {
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}
function roundedRectPath(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  return [
    `M ${x + r} ${y}`,
    `H ${x + width - r}`,
    `A ${r} ${r} 0 0 1 ${x + width} ${y + r}`,
    `V ${y + height - r}`,
    `A ${r} ${r} 0 0 1 ${x + width - r} ${y + height}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + height - r}`,
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    "Z"
  ].join(" ");
}
function blobPath(cx, cy, radius, rng, wobble = 0.22, points = 96) {
  const harmonics = [0, 0, 0].map(() => rng());
  const steps = [2, 3, 5].map(() => 1 + Math.floor(rng() * 4));
  const phases = [0, 0, 0].map(() => rng() * TAU);
  const path = [];
  for (let i = 0; i <= points; i += 1) {
    const angle = i / points * TAU;
    let r = radius;
    for (let h = 0; h < 3; h += 1) {
      r += radius * wobble * harmonics[h] * Math.sin(steps[h] * angle + phases[h]);
    }
    const [x, y] = polar(cx, cy, Math.max(radius * 0.35, r), angle);
    path.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `${path.join(" ")} Z`;
}
function starPath(cx, cy, outer, inner, points = 4) {
  const path = [];
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = i / (points * 2) * TAU - Math.PI / 2;
    const [x, y] = polar(cx, cy, radius, angle);
    path.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `${path.join(" ")} Z`;
}
function ProjectGlyph({ text, family, palette, className }) {
  const shapes = useMemo(() => buildGlyph(text, family, palette), [text, family, palette.primary]);
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      className,
      viewBox: "0 0 100 100",
      "aria-hidden": "true",
      focusable: "false",
      "data-family": family
    },
    shapes
  );
}
function buildGlyph(text, family, palette) {
  const rng = makeRng(seedFrom(`${text}:${family}`));
  const p = paletteFor(text);
  const primary = `var(${p.primary})`;
  const secondary = `var(${p.secondary})`;
  const line = `var(--line-strong)`;
  const soft = `var(--accent-soft)`;
  switch (family) {
    case "orbital": {
      const rings = 2 + Math.floor(rng() * 3);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, Array.from({ length: rings }, (_, i) => {
        const r = 16 + i * (26 / rings);
        return /* @__PURE__ */ React.createElement(
          "circle",
          {
            key: `ring-${i}`,
            cx: "50",
            cy: "50",
            r: r.toFixed(1),
            fill: "none",
            stroke: i % 2 ? line : soft,
            strokeWidth: i % 2 ? 1 : 6,
            strokeDasharray: i % 3 === 0 ? "4 6" : void 0
          }
        );
      }), (() => {
        const [nx] = polar(50, 50, 20, rng() * TAU);
        const [, ny] = polar(50, 50, 30, 1.2);
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: nx.toFixed(1), cy: "34", r: "7", fill: primary }), /* @__PURE__ */ React.createElement("circle", { cx: "63", cy: ny.toFixed(1), r: "4", fill: secondary }));
      })());
    }
    case "lattice": {
      const cols = 4 + Math.floor(rng() * 3);
      const rows = cols;
      const gap = 72 / cols;
      const nodes = [];
      for (let x = 0; x < cols; x += 1) {
        for (let y = 0; y < rows; y += 1) {
          if (rng() > 0.72) continue;
          nodes.push(
            /* @__PURE__ */ React.createElement(
              "circle",
              {
                key: `${x}-${y}`,
                cx: 14 + x * gap,
                cy: 14 + y * gap,
                r: 2 + rng() * 3,
                fill: rng() > 0.7 ? primary : line
              }
            )
          );
        }
      }
      return /* @__PURE__ */ React.createElement(React.Fragment, null, Array.from({ length: cols - 1 }, (_, i) => /* @__PURE__ */ React.createElement(
        "line",
        {
          key: `v-${i}`,
          x1: 14 + i * gap + gap,
          y1: "12",
          x2: 14 + i * gap + gap,
          y2: "88",
          stroke: line,
          strokeWidth: "0.8",
          opacity: "0.5"
        }
      )), nodes);
    }
    case "flow": {
      const lanes = 3 + Math.floor(rng() * 3);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, Array.from({ length: lanes }, (_, i) => {
        const y = 22 + i * 56 / lanes;
        const amp = 6 + rng() * 12;
        const phase = rng() * TAU;
        const d = [
          `M 8 ${y}`,
          `C 30 ${y - amp}, 42 ${y + amp}, 58 ${y}`,
          `S 86 ${y - amp * 0.6}, 92 ${y}`
        ].join(" ");
        return /* @__PURE__ */ React.createElement("g", { key: `lane-${i}` }, /* @__PURE__ */ React.createElement("path", { d, fill: "none", stroke: line, strokeWidth: "1.4", opacity: "0.55" }), /* @__PURE__ */ React.createElement(
          "circle",
          {
            cx: 26 + phase * 20 % 60,
            cy: y + Math.sin(phase) * amp * 0.5,
            r: "4",
            fill: i % 2 ? secondary : primary
          }
        ));
      }));
    }
    case "stack": {
      const layers = 4 + Math.floor(rng() * 3);
      const heights = Array.from({ length: layers }, () => 6 + rng() * 10);
      const total = heights.reduce((sum, h) => sum + h, 0);
      let y = 92;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, heights.map((height, i) => {
        y -= height;
        const inset = i % 2 * 8;
        return /* @__PURE__ */ React.createElement(
          "rect",
          {
            key: `layer-${i}`,
            x: 14 + inset,
            y: y.toFixed(1),
            width: 72 - inset * 2,
            height: Math.max(3, height - 2).toFixed(1),
            rx: "2.5",
            fill: i === 0 ? primary : i % 2 ? secondary : soft,
            opacity: i === 0 ? 1 : 0.85 - i * 0.06
          }
        );
      }));
    }
    case "burst": {
      const rays = 8 + Math.floor(rng() * 6);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "50", r: "12", fill: primary }), Array.from({ length: rays }, (_, i) => {
        const angle = i / rays * TAU;
        const inner = 18 + rng() * 8;
        const outer = 34 + rng() * 12;
        const [x1, y1] = polar(50, 50, inner, angle);
        const [x2, y2] = polar(50, 50, outer, angle);
        return /* @__PURE__ */ React.createElement(
          "line",
          {
            key: `ray-${i}`,
            x1: x1.toFixed(1),
            y1: y1.toFixed(1),
            x2: x2.toFixed(1),
            y2: y2.toFixed(1),
            stroke: i % 3 === 0 ? secondary : line,
            strokeWidth: i % 3 === 0 ? 3 : 1.6,
            strokeLinecap: "round"
          }
        );
      }));
    }
    case "weave": {
      const strands = 5;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, Array.from({ length: strands }, (_, i) => {
        const y = 20 + i * 60 / strands;
        return /* @__PURE__ */ React.createElement(
          "path",
          {
            key: `w-${i}`,
            d: `M 10 ${y} C 30 ${y - 16}, 46 ${y + 16}, 62 ${y} S 84 ${y - 10}, 90 ${y}`,
            fill: "none",
            stroke: i % 2 ? primary : line,
            strokeWidth: i % 2 ? 2.6 : 1.2,
            opacity: i % 2 ? 0.9 : 0.6
          }
        );
      }));
    }
    case "prism": {
      const sides = 3 + Math.floor(rng() * 4);
      const points = Array.from({ length: sides }, (_, i) => {
        const [x, y] = polar(50, 52, 30, -Math.PI / 2 + i / sides * TAU);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(" ");
      const inner = Array.from({ length: sides }, (_, i) => {
        const [x, y] = polar(50, 52, 21, -Math.PI / 2 + i / sides * TAU);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(" ");
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("polygon", { points, fill: soft, stroke: line, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement(
        "polygon",
        {
          points: inner,
          fill: "none",
          stroke: primary,
          strokeWidth: "2",
          strokeLinejoin: "round",
          opacity: "0.9"
        }
      ), Array.from({ length: sides }, (_, i) => {
        const [x, y] = polar(50, 52, 30, -Math.PI / 2 + i / sides * TAU);
        return /* @__PURE__ */ React.createElement("circle", { key: `node-${i}`, cx: x.toFixed(1), cy: y.toFixed(1), r: "2.4", fill: secondary });
      }));
    }
    case "ring":
    default: {
      const arcs = 3 + Math.floor(rng() * 3);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, Array.from({ length: arcs }, (_, i) => {
        const r = 14 + i * 9;
        const start = rng() * TAU;
        const sweep = TAU * (0.3 + rng() * 0.6);
        const [x1, y1] = polar(50, 50, r, start);
        const [x2, y2] = polar(50, 50, r, start + sweep);
        const large = sweep > Math.PI ? 1 : 0;
        return /* @__PURE__ */ React.createElement(
          "path",
          {
            key: `arc-${i}`,
            d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`,
            fill: "none",
            stroke: i % 2 ? primary : secondary,
            strokeWidth: i % 2 ? 4 : 2,
            strokeLinecap: "round",
            opacity: 0.9 - i * 0.12
          }
        );
      }));
    }
  }
}
function ServiceGlyph({ text, className }) {
  const shapes = useMemo(() => buildServiceGlyph(text), [text]);
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      className,
      viewBox: "0 0 100 100",
      "aria-hidden": "true",
      focusable: "false"
    },
    shapes
  );
}
function buildServiceGlyph(text) {
  const rng = makeRng(seedFrom(`service:${text}`));
  const p = paletteFor(text);
  const primary = `var(${p.primary})`;
  const secondary = `var(${p.secondary})`;
  const line = `var(--line-strong)`;
  const cells = 3 + Math.floor(rng() * 2);
  const gap = 64 / cells;
  const blocks = [];
  for (let x = 0; x < cells; x += 1) {
    for (let y = 0; y < cells; y += 1) {
      const roll = rng();
      if (roll < 0.42) continue;
      const px = 18 + x * gap;
      const py = 18 + y * gap;
      const size = gap - 6;
      const fill = roll > 0.86 ? primary : roll > 0.68 ? secondary : "var(--accent-soft)";
      blocks.push(
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            key: `${x}-${y}`,
            x: px.toFixed(1),
            y: py.toFixed(1),
            width: size.toFixed(1),
            height: size.toFixed(1),
            rx: roll > 0.86 ? 3 : 2,
            fill,
            stroke: roll > 0.86 ? "none" : line,
            strokeWidth: "0.8"
          }
        )
      );
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "14", y: "14", width: "72", height: "72", rx: "8", fill: "none", stroke: line, strokeWidth: "1", opacity: "0.6" }), blocks);
}
export {
  FAMILY_LABEL,
  ProjectGlyph,
  SHAPE_FAMILIES,
  ServiceGlyph,
  blobPath,
  familyFor,
  makeRng,
  paletteFor,
  roundedRectPath,
  seedFrom,
  starPath
};
