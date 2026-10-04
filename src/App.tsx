import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TelemetryStrip } from './components/TelemetryStrip';
import { About } from './components/About';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Leadership } from './components/Leadership';
import { Research } from './components/Research';
import { Contact } from './components/Contact';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { TerminalWidget } from './components/TerminalWidget';
import { KonamiCode } from './components/KonamiCode';
import { ToastProvider } from './components/Toast';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <div className="app">
        {/* Scroll Progress Telemetry Bar */}
        <ScrollProgress />

        {/* Interactive Neural/Constellation Background */}
        <BackgroundCanvas />

        {/* Main Page Layout */}
        <div className="main-content">
          <Navbar />
          <Hero />

          {/* Impact & Credentials Telemetry Ribbon */}
          <TelemetryStrip />

          <hr className="section-divider" />
          <About />
          <hr className="section-divider" />
          <Education />
          <hr className="section-divider" />
          <Projects />
          <hr className="section-divider" />
          <Skills />
          <hr className="section-divider" />
          <Leadership />
          <hr className="section-divider" />
          <Research />
          <hr className="section-divider" />
          <Contact />
        </div>

        {/* Interactive Developer Terminal Widget */}
        <TerminalWidget />

        {/* Secret Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A) */}
        <KonamiCode />
      </div>
    </ToastProvider>
  );
}

export default App;
