import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Contact from "./section/Contact";
import Experience from "./section/Experience";
import FeatureCards from "./section/FeatureCards";
import Footer from "./section/Footer";
import Hero from "./section/Hero";
import Showcase from "./section/Showcase";
import TechStack from "./section/TechStack";

const App = () => {
  return (
    <>
      <Loader /> 
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
