import { NoiseBackground } from './components/NoiseBackground';
import { PointerGlow } from './components/PointerGlow';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CvViewer } from './components/CvViewer';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { MetadataProvider } from './context/MetadataContext';

export default function App() {
  return (
    <MetadataProvider>
      <div className="print:hidden">
        <NoiseBackground />
        <PointerGlow />
      </div>
      <div className="relative min-h-screen selection:bg-zinc-800 selection:text-white pb-6 print:pb-0">
        <div className="print:hidden">
          <Header />
        </div>
        <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 print:max-w-none print:px-0 print:py-0 print:mx-0">
          <div className="print:hidden">
            <Hero />
          </div>
          <CvViewer />
          <div className="print:hidden">
            <Projects />
          </div>
          <div className="print:hidden">
            <Footer />
          </div>
        </main>
      </div>
    </MetadataProvider>
  );
}

