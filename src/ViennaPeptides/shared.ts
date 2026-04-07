export const COLORS = {
  bg: '#1a1a1a',
  bgDark: '#0d0d0d',
  bgCard: '#1e1e1e',
  gold: '#d4af37',
  green: '#00a676',
  greenLight: '#00cc90',
  white: '#f0f0f0',
  whiteMid: '#888888',
  red: '#e53935',
} as const;

export const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// rgba helpers (ampoule body is r=212,g=175,b=55 for gold; r=0,g=166,b=118 for green)
export const rgba = {
  gold: (a: number) => `rgba(212,175,55,${a})`,
  green: (a: number) => `rgba(0,166,118,${a})`,
  white: (a: number) => `rgba(240,240,240,${a})`,
  red: (a: number) => `rgba(229,57,53,${a})`,
};

// Deterministic particles (no Math.random – consistent across renders)
export const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: Math.sin(i * 2.399) * 0.42 + 0.5,
  y: Math.cos(i * 1.618) * 0.42 + 0.5,
  size: 2 + (i % 4),
  phase: i * 0.5,
}));
