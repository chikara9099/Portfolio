export interface ThemeColor {
  id: string;
  name: string;
  accent: string;
  accentRgb: string; // for rgba() usage: "56, 189, 248"
  accentHover: string;
  aurora: string;
}

export const THEMES: ThemeColor[] = [
  {
    id: 'cyan',
    name: 'Electric Cyan',
    accent: '#38bdf8',
    accentRgb: '56, 189, 248',
    accentHover: '#7dd3fc',
    aurora: '#0284c7',
  },
  {
    id: 'emerald',
    name: 'Cyber Emerald',
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    accentHover: '#34d399',
    aurora: '#047857',
  },
  {
    id: 'amber',
    name: 'Solar Amber',
    accent: '#f59e0b',
    accentRgb: '245, 158, 11',
    accentHover: '#fbbf24',
    aurora: '#b45309',
  },
  {
    id: 'violet',
    name: 'Neon Violet',
    accent: '#a855f7',
    accentRgb: '168, 85, 247',
    accentHover: '#c084fc',
    aurora: '#7e22ce',
  },
  {
    id: 'rose',
    name: 'Rose Crimson',
    accent: '#f43f5e',
    accentRgb: '244, 63, 94',
    accentHover: '#fb7185',
    aurora: '#be123c',
  },
  {
    id: 'titanium',
    name: 'Titanium',
    accent: '#e2e8f0',
    accentRgb: '226, 232, 240',
    accentHover: '#ffffff',
    aurora: '#64748b',
  },
];

type ThemeListener = (theme: ThemeColor) => void;
const listeners: ThemeListener[] = [];

export function subscribeToTheme(listener: ThemeListener): () => void {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function getCurrentTheme(): ThemeColor {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('portfolio_accent_theme');
    const found = THEMES.find((t) => t.id === saved);
    if (found) return found;
  }
  return THEMES[0]; // Cyan default
}

export function applyTheme(themeId: string): ThemeColor {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  const root = document.documentElement;
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-hover', theme.accentHover);
  root.style.setProperty('--accent-glow', `rgba(${theme.accentRgb}, 0.12)`);
  root.style.setProperty('--border-hover', `rgba(${theme.accentRgb}, 0.35)`);

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('portfolio_accent_theme', theme.id);
  }

  // Notify listeners (like BackgroundCanvas)
  listeners.forEach((fn) => fn(theme));
  return theme;
}
