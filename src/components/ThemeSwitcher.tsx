import { useState, useEffect, useRef } from 'react';
import { Palette, Check } from 'lucide-react';
import { THEMES, getCurrentTheme, applyTheme } from '../utils/theme';
import type { ThemeColor } from '../utils/theme';
import { playBlip } from '../utils/sound';
import './ThemeSwitcher.css';

export const ThemeSwitcher = () => {
  const [current, setCurrent] = useState<ThemeColor>(getCurrentTheme());
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize theme on mount
  useEffect(() => {
    const active = applyTheme(current.id);
    setCurrent(active);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (t: ThemeColor) => {
    const updated = applyTheme(t.id);
    setCurrent(updated);
    setIsOpen(false);
    playBlip(1500);
  };

  return (
    <div className="theme-switcher" ref={containerRef}>
      <button
        className="theme-switcher__btn"
        onClick={() => {
          setIsOpen((prev) => !prev);
          playBlip(1200);
        }}
        aria-label="Change Accent Color Theme"
        title={`Theme: ${current.name}`}
      >
        <span
          className="theme-switcher__active-dot"
          style={{ backgroundColor: current.accent, boxShadow: `0 0 10px ${current.accent}` }}
        />
        <Palette size={14} className="theme-switcher__icon" />
      </button>

      {isOpen && (
        <div className="theme-switcher__dropdown">
          <div className="theme-switcher__header">Accent Engine</div>
          <div className="theme-switcher__grid">
            {THEMES.map((theme) => {
              const isActive = current.id === theme.id;
              return (
                <button
                  key={theme.id}
                  className={`theme-switcher__item ${isActive ? 'theme-switcher__item--active' : ''}`}
                  onClick={() => handleSelect(theme)}
                >
                  <span
                    className="theme-switcher__color-swatch"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {isActive && <Check size={11} color="#0c0c0e" strokeWidth={3} />}
                  </span>
                  <span className="theme-switcher__item-name">{theme.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
