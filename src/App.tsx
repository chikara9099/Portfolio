import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Leadership } from './components/Leadership';
import { Research } from './components/Research';
import { Contact } from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
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
  );
}

export default App;
