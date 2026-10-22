import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Impact from './components/Impact';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Thanks from './components/Thanks';

function Home() {
  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Impact />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thanks" element={<Thanks />} />
          {/* Catch-all route: any unknown path lands back on the portfolio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
