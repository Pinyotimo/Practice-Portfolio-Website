import { lazy, Suspense } from 'react';
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
/* Only CV visitors download the CV page and its print styles. */
const Cv = lazy(() => import('./components/Cv'));

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
          <Route
            path="/cv"
            element={
              <Suspense fallback={null}>
                <Cv />
              </Suspense>
            }
          />
          {/* Catch-all route: any unknown path lands back on the portfolio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
