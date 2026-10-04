import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { TerminalModal } from './TerminalModal';
import { playBlip } from '../utils/sound';
import { Magnetic } from './Magnetic';
import './TerminalWidget.css';

export const TerminalWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut listener: backtick ` or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in another input/textarea
      const activeEl = document.activeElement;
      const isInput = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA';

      if (e.key === '`' && !isInput) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        playBlip(1000);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        playBlip(1000);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    playBlip(1100);
  };

  return (
    <>
      {/* Floating Launcher Button with Magnetic attraction */}
      <div className="terminal-launcher-anchor">
        <Magnetic strength={0.4}>
          <button
            className="terminal-launcher"
            onClick={handleOpen}
            aria-label="Open Interactive Developer Terminal"
            title="Open Terminal (Press ` or Ctrl+K)"
          >
            <span className="terminal-launcher__pulse" />
            <Terminal size={17} className="terminal-launcher__icon" />
            <span className="terminal-launcher__text">terminal</span>
            <kbd className="terminal-launcher__kbd">`</kbd>
          </button>
        </Magnetic>
      </div>

      {/* Terminal Modal Dialog */}
      <TerminalModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
