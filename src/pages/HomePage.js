// components
import Navbar from "../components/reusable/Navbar";
import Footer from "../components/reusable/Footer";
import Hero from "../layouts/Hero";
import Searchbar from "../components/reusable/SearchBar";

// assets
import MainHero from '../assets/images/content-module-hero1-no-bg.png';
import SecondaryHero from "../assets/images/content-module-hero2.png"
import Carousel from "../../../temp/test/Carousel";
import Card from "../../../temp/test/Card";

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

// background: linear-gradient(180deg, #E3E3E3 0%, #EEEEEE 19%, #FFFFFF 82%, #F6F6F6 100%);

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

const images = [
  'https://i.pinimg.com/736x/4f/a1/9f/4fa19fd04ca2ed56e1a3a2ccd5704c5c.jpg',
  'https://i.pinimg.com/736x/d1/7e/c5/d17ec5fb63bc6deb77c9adbf45022bc7.jpg',
  'https://i.pinimg.com/736x/40/31/04/4031047c175b5214ee14da78393451e5.jpg',
];

const HomePage = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      
      <Hero props={hero1}>
        <Searchbar searchPlaceholder={hero1.searchPlaceholder} />
      </Hero>
      
      <Hero props={hero2} />
      
      <Card />
      <Footer/>
    </div>
  );
};

export default HomePage;