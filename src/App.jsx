import { lazy, Suspense } from "react";
import Navbar from "./section/Navbar";
import Loader from "./components/Loader";
import { ThemeProvider } from "./context/ThemeContext";

const Hero = lazy(() => import("./section/Hero"));
const Showcase = lazy(() => import("./section/Showcase"));
// const FeatureCards = lazy(() => import("./section/FeatureCards"));
const TechStack = lazy(() => import("./section/TechStack"));
const Experience = lazy(() => import("./section/Experience"));
const Contact = lazy(() => import("./section/Contact"));
const Footer = lazy(() => import("./section/Footer"));

const App = () => {
  return (
    <ThemeProvider>
      <Loader />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[var(--bg-primary)]" />}>
        <Hero />
        <Showcase />
        {/* <FeatureCards /> */}
        <TechStack />
        <Experience />
        <Contact />
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
