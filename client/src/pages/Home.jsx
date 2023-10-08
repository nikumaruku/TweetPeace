import { Link } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";

import Feature from "./home/Feature.jsx";
import Hero from "./home/Hero.jsx";
import Footer from "./home/Footer.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <Element name="feature">
        <Feature />
      </Element>
      <Footer />
    </>
  );
};

export default Home;
