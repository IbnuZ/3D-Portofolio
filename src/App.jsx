import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./section/Navbar";
import Contact from "./section/Contact";
import Experience from "./section/Experience";
import FeatureCards from "./section/FeatureCards";
import Footer from "./section/Footer";
import Hero from "./section/Hero";
import Showcase from "./section/Showcase";
import TechStack from "./section/TechStack";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading, bisa diganti dengan event saat assets sudah siap
    const timeout = setTimeout(() => {
      setLoading(false);
    }); 

    return () => clearTimeout(timeout);
  }, []); 

  if (loading) {
    return <Loader />; // hanya tampilkan loader
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <FeatureCards />
      <TechStack />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
