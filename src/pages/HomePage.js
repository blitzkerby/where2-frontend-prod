// components
import Navbar from "../components/reusable/Navbar";
import Footer from "../components/reusable/Footer";
import Hero from "../layouts/Hero";
import Searchbar from "../components/reusable/SearchBar";
import Card from "../components/reusable/Card"

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <Navbar/>
      <VisitTracker path={location.pathname}/>
=======
=======
      <Navbar/>
      <VisitTracker path={location.pathname}/>
>>>>>>> 301cd8a (develop: made some adjustment to config file so develop)
      <Navbar />
=======
      {/* <Navbar /> */}
>>>>>>> ef33a06 (MODIFIED : card.js)
=======
      <Navbar />
>>>>>>> d5ce0e3 (REBASE : Navbar.js)
      
      <Hero props={hero1}>
        <Searchbar searchPlaceholder={hero1.searchPlaceholder} />
      </Hero>
      
<<<<<<< HEAD
<<<<<<< HEAD
      <Hero props={hero2} />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 22fb185 (REBASE : search.js)
=======
      
=======
=======
      <Hero props={hero2} /> */}
>>>>>>> ef33a06 (MODIFIED : card.js)

>>>>>>> 8cf1e62 (REBASE : HomePage.js)
      <Card />
<<<<<<< HEAD
>>>>>>> 54fa07c (MODIFIED : App.js)
      <Footer/>
=======
      {/* <Footer/> */}
>>>>>>> ef33a06 (MODIFIED : card.js)
=======
      <Hero props={hero2} />

      <Footer/>
>>>>>>> d5ce0e3 (REBASE : Navbar.js)
    </div>
  );
};

export default HomePage;