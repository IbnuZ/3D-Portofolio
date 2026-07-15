import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./section/Navbar";
import Loader from "./components/Loader";

const Hero = lazy(() => import("./section/Hero"));
const Showcase = lazy(() => import("./section/Showcase"));
const FeatureCards = lazy(() => import("./section/FeatureCards"));
const TechStack = lazy(() => import("./section/TechStack"));
const Experience = lazy(() => import("./section/Experience"));
const Contact = lazy(() => import("./section/Contact"));
const Footer = lazy(() => import("./section/Footer"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-black" />}> 
        <Hero />
        <Showcase />
        <FeatureCards />
        <TechStack />
        <Experience />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
};

export default App;
