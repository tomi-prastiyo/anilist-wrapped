// ================================================
// Design Tokens — Single source of truth for colors
// Used by components that need JS values (e.g. Recharts)
// CSS equivalents live in globals.css as custom properties
// ================================================

export const colors = {
  // Base
  background: "#020617",
  foreground: "#e5e7eb",

  // Card surfaces
  card: "#1C1C27",
  cardBorder: "#31313B",

  // Accent
  pink: {
    400: "#F472B6",
    500: "#EC4899",
  },

  // Purple
  purple: {
    light: "#DAB2FF",
    accent: "#E7D3EB",
    muted: "#B7A5BB",
    bg: "#271932",
    border: "#40225C",
  },

  // Orange (manga)
  orange: {
    accent: "#FBAB73",
    bg: "#2B231D",
    border: "#562C17",
  },

  // Neutral text
  text: {
    primary: "#FFFFFF",
    secondary: "#E5E7EB",
    muted: "#9CA3AF",
    subtle: "#CBD5E1",
    dim: "#94A3B8",
    faint: "#64748B",
  },

  // Dashboard background
  dashboard: {
    from: "#0b1220",
    via: "#0e1628",
    to: "#0b1220",
    deep: "#0b1622",
    surface: "#0B1120",
  },

  // Rankings
  gold: "#EAB308",
} as const;

// Recharts shared styles (JS objects needed by recharts)
export const chartStyles = {
  tooltip: {
    backgroundColor: colors.dashboard.surface,
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    fontSize: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    pointerEvents: "none" as const,
  },
  tooltipLabel: { color: colors.text.secondary, fontWeight: 600 },
  tooltipItem: { color: colors.pink[500] },
  tooltipCursor: { stroke: "rgba(255,255,255,0.12)" },
  axis: {
    tick: { fill: colors.text.dim, fontSize: 10 },
    axisLine: { stroke: "rgba(255,255,255,0.2)" },
    tickLine: { stroke: "rgba(255,255,255,0.1)" },
  },
  grid: {
    stroke: "rgba(255,255,255,0.08)",
    strokeDasharray: "3 3",
  },
} as const;
