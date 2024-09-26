// components
import Navbar from "../components/reusable/Navbar";
import Footer from "../components/reusable/Footer";
import Hero from "../layouts/Hero";
import Searchbar from "../components/reusable/SearchBar";
import Card from "../components/reusable/Card"
import { useLocation } from "react-router-dom";

// assets
import MainHero from '../assets/images/content-module-hero1-no-bg.png';
import SecondaryHero from "../assets/images/content-module-hero2.png"

const hero1 = {
  title: "DISCOVER YOUR FUTURE.",
  subtitle: "Everything starts here.",
  searchPlaceholder: "Search University by name",
  backgroundGradient: "bg-gray-primary",
  titleColor: "text-blue-900",
  subtitleColor: "text-blue-600",
  mainImageSrc: MainHero,
  mainImageAlt: "University building",
  onSearch: () => {},
};

const hero2 = {
  title: "PURSUE YOUR CAREER.",
  subtitle: "By supporting yourself.",
  searchPlaceholder: "Search University by name",
  backgroundGradient: "from-blue-100",
  titleColor: "text-blue-900",
  subtitleColor: "text-blue-600",
  mainImageSrc: SecondaryHero,
  mainImageAlt: "University building",
  onSearch: () => {},
}

const HomePage = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar/>
      <VisitTracker path={location.pathname}/>
      <Navbar />
      
      <Hero props={hero1}>
        <Searchbar searchPlaceholder={hero1.searchPlaceholder} />
      </Hero>
      
      <Hero props={hero2} />

      <Footer/>
    </div>
  );
};

export default HomePage;