/* ==========================================================================
   charts.js — dependency-free SVG chart renderers.
   Every function returns an SVG string; callers inject via innerHTML then
   toggle the `.grown` class (see animations.css) to trigger the draw-in.
   ========================================================================== */

const CHART_COLORS = ["#46a866", "#d9b23f", "#c9612f", "#5a8fd6", "#9a6fd6", "#c98a3f"];

function svgWrap(w, h, inner, extraClass = "") {
  return `<svg class="${extraClass}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

/* ---------------- Bar chart (vertical) ---------------- */
function renderBarChart(labels, values, opts = {}) {
  const w = opts.w || 640, h = opts.h || 320, pad = 46;
  const max = opts.max || Math.max(...values) * 1.15;
  const bw = (w - pad * 2) / values.length;
  let bars = "", axis = "";

  values.forEach((v, i) => {
    const bh = (v / max) * (h - pad * 2);
    const x = pad + i * bw + bw * 0.2;
    const y = h - pad - bh;
    const color = opts.colors ? opts.colors[i] : CHART_COLORS[i % CHART_COLORS.length];
    bars += `<g>
      <rect class="bar-fill-v" x="${x}" y="${y}" width="${bw * 0.6}" height="${bh}" rx="4" fill="${color}" />
      <text x="${x + bw * 0.3}" y="${h - pad + 20}" text-anchor="middle" font-size="11" fill="var(--ink-faint)" font-family="var(--f-mono)">${labels[i]}</text>
      <text x="${x + bw * 0.3}" y="${y - 8}" text-anchor="middle" font-size="12" fill="var(--ink)" font-family="var(--f-mono)">${v}</text>
    </g>`;
  });

  axis = `<line x1="${pad}" y1="${h - pad}" x2="${w - pad}" y2="${h - pad}" stroke="var(--line-strong)" />`;
  return svgWrap(w, h, axis + bars);
}

/* ---------------- Horizontal bar (feature importance) ---------------- */
function renderHBarChart(labels, values, opts = {}) {
  const w = opts.w || 640, rowH = opts.rowH || 34, pad = 140;
  const h = rowH * values.length + 20;
  const max = Math.max(...values) * 1.1;
  let bars = "";
  values.forEach((v, i) => {
    const bw = ((w - pad - 30) / max) * v;
    const y = i * rowH + 10;
    const color = CHART_COLORS[i % CHART_COLORS.length];
    bars += `<g>
      <text x="${pad - 12}" y="${y + rowH * 0.42}" text-anchor="end" font-size="12" fill="var(--ink-dim)" font-family="var(--f-mono)">${labels[i]}</text>
      <rect class="bar-fill" x="${pad}" y="${y + 4}" width="${bw}" height="${rowH - 16}" rx="4" fill="${color}" />
      <text x="${pad + bw + 8}" y="${y + rowH * 0.42}" font-size="11" fill="var(--ink)" font-family="var(--f-mono)">${(v * 100).toFixed(1)}%</text>
    </g>`;
  });
  return svgWrap(w, h, bars);
}

/* ---------------- Line chart (multi-series) ---------------- */
function renderLineChart(xLabels, series, opts = {}) {
  const w = opts.w || 640, h = opts.h || 300, pad = 44;
  const allVals = series.flatMap(s => s.data);
  const max = opts.max || Math.max(...allVals) * 1.1;
  const min = opts.min !== undefined ? opts.min : Math.min(0, Math.min(...allVals));
  const stepX = (w - pad * 2) / (xLabels.length - 1);

  const toXY = (v, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    return [x, y];
  };

  let grid = "";
  for (let g = 0; g <= 4; g++) {
    const y = pad + (g * (h - pad * 2)) / 4;
    grid += `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`;
  }

  let paths = "", legend = "";
  series.forEach((s, si) => {
    const color = s.color || CHART_COLORS[si % CHART_COLORS.length];
    const pts = s.data.map((v, i) => toXY(v, i));
    const d = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    paths += `<path class="path-draw" d="${d}" fill="none" stroke="${color}" stroke-width="2.5" />`;
    pts.forEach(p => {
      paths += `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="${color}" />`;
    });
    legend += `<span class="legend-item"><span class="legend-swatch" style="background:${color}"></span>${s.name}</span>`;
  });

  let xAxis = "";
  xLabels.forEach((l, i) => {
    if (i % Math.ceil(xLabels.length / 8) !== 0 && i !== xLabels.length - 1) return;
    const [x] = toXY(0, i);
    xAxis += `<text x="${x}" y="${h - pad + 20}" text-anchor="middle" font-size="10" fill="var(--ink-faint)" font-family="var(--f-mono)">${l}</text>`;
  });

  return {
    svg: svgWrap(w, h, grid + paths + xAxis),
    legendHTML: `<div class="legend">${legend}</div>`,
  };
}

/* ---------------- Radar chart ---------------- */
function renderRadarChart(axes, series, opts = {}) {
  const w = opts.w || 380, h = opts.h || 380;
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 46;
  const n = axes.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;

  let rings = "";
  [0.25, 0.5, 0.75, 1].forEach(f => {
    const pts = axes.map((_, i) => {
      const a = angle(i);
      return `${cx + Math.cos(a) * r * f},${cy + Math.sin(a) * r * f}`;
    }).join(" ");
    rings += `<polygon points="${pts}" fill="none" stroke="var(--line)" stroke-width="1"/>`;
  });

  let spokes = "", labels = "";
  axes.forEach((a, i) => {
    const ang = angle(i);
    const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
    spokes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`;
    const lx = cx + Math.cos(ang) * (r + 26), ly = cy + Math.sin(ang) * (r + 26);
    labels += `<text x="${lx}" y="${ly}" text-anchor="middle" font-size="11" fill="var(--ink-dim)" font-family="var(--f-mono)">${a}</text>`;
  });

  let shapes = "", legend = "";
  series.forEach((s, si) => {
    const color = s.color || CHART_COLORS[si % CHART_COLORS.length];
    const pts = s.data.map((v, i) => {
      const a = angle(i);
      const rad = r * v;
      return `${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`;
    }).join(" ");
    shapes += `<polygon points="${pts}" fill="${color}22" stroke="${color}" stroke-width="2"/>`;
    legend += `<span class="legend-item"><span class="legend-swatch" style="background:${color}"></span>${s.name}</span>`;
  });

  return {
    svg: svgWrap(w, h, rings + spokes + shapes + labels),
    legendHTML: `<div class="legend">${legend}</div>`,
  };
}

/* ---------------- Donut / pie chart ---------------- */
function renderDonut(labels, values, opts = {}) {
  const w = opts.w || 280, h = opts.h || 280;
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 14, stroke = opts.stroke || 26;
  const total = values.reduce((a, b) => a + b, 0);
  const circ = 2 * Math.PI * r;
  let offset = 0, paths = "", legend = "";

  values.forEach((v, i) => {
    const frac = v / total;
    const len = frac * circ;
    const color = opts.colors ? opts.colors[i] : CHART_COLORS[i % CHART_COLORS.length];
    paths += `<circle class="stroke-draw" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}"
      stroke-width="${stroke}" stroke-dasharray="${len} ${circ - len}" stroke-dashoffset="${-offset}"
      transform="rotate(-90 ${cx} ${cy})" />`;
    offset += len;
    legend += `<span class="legend-item"><span class="legend-swatch" style="background:${color}"></span>${labels[i]} — ${((frac) * 100).toFixed(0)}%</span>`;
  });

  return {
    svg: svgWrap(w, h, paths),
    legendHTML: `<div class="legend">${legend}</div>`,
  };
}

/* ---------------- Heatmap (district x risk) ---------------- */
function renderHeatmap(districts, opts = {}) {
  const cols = opts.cols || 10;
  const cell = opts.cell || 34;
  const rows = Math.ceil(districts.length / cols);
  const w = cols * cell, h = rows * cell;

  const colorFor = (idx) => {
    if (idx < 0.33) return "var(--risk-low)";
    if (idx < 0.66) return "var(--risk-medium)";
    return "var(--risk-high)";
  };

  let cells = "";
  districts.forEach((d, i) => {
    const x = (i % cols) * cell, y = Math.floor(i / cols) * cell;
    cells += `<g class="grid-cell-group">
      <rect class="grid-cell" x="${x + 2}" y="${y + 2}" width="${cell - 4}" height="${cell - 4}" rx="5"
        fill="${colorFor(d.risk_index)}" opacity="${0.35 + d.risk_index * 0.6}">
        <title>${d.district}: ${(d.risk_index * 100).toFixed(0)}% (${d.category})</title>
      </rect>
    </g>`;
  });
  return svgWrap(w, h, cells);
}

/* ---------------- Animated counter ---------------- */
function animateCount(el, to, opts = {}) {
  const dur = opts.duration || 1200;
  const decimals = opts.decimals || 0;
  const start = performance.now();
  const from = 0;
  function tick(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = from + (to - from) * eased;
    el.textContent = val.toFixed(decimals) + (opts.suffix || "");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
