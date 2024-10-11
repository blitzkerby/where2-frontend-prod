
// components
import Navbar from "../components/reusable/Navbar";
import Footer from "../components/reusable/Footer";
import Hero from "../layouts/Hero";
import Searchbar from "../components/reusable/SearchBar";
import WrapperComponent from "../components/reusable/WrapperComponent";
// import Card from "../components/reusable/Card";

// assets
import MainHero from "../assets/images/content-module-hero1-no-bg.png";
import SecondaryHero from "../assets/images/content-module-hero2.png";
import CardSlider from "../components/reusable/CardsSlider";

const hero1 = {
  title: "DISCOVER YOUR FUTURE.",
  subtitle: "Everything starts here.",
  searchPlaceholder: "Search University by name",
  backgroundGradient: "bg-gray-primary",
  titleColor: "text-blue-900",
  subtitleColor: "text-blue-600",
  mainImageSrc: MainHero,
  mainImageAlt: "University building",
  onSearch: () => { },
};

// background: linear-gradient(180deg, #E3E3E3 0%, #EEEEEE 19%, #FFFFFF 82%, #F6F6F6 100%);

const hero2 = {
  title: "DISCOVER YOUR FUTURE.",
  subtitle: "Everything starts here.",
  searchPlaceholder: "Search University by name",
  backgroundGradient: "from-blue-100",
  titleColor: "text-blue-900",
  subtitleColor: "text-blue-600",
  mainImageSrc: "",
  mainImageAlt: "University building",
  onSearch: () => {},
};
const cards = [
  {
    title: "Scholarships",
    description: "Explore the latest scholarships available for Cambodian students.",
    image: "",
  },
  {
    title: "University Fair 2024",
    description: "Join us at the University Fair to learn more about programs and meet representatives from top universities.",
    image: "",
  },
  {
    title: "Career Expo",
    description: "Attend the Career Expo and meet potential employers from various industries.",
    image: "",
  },
  {
    title: "Research Conference",
    description: "Discover groundbreaking research presented by university students and professors.",
    image: "",
    path : "https://www.youtube.com"
  },
  {
    title: "Student Orientation",
    description: "New to campus? Don’t miss the Student Orientation to get familiar with the university.",
    image: "",
  },
  {
    title: "Alumni Meet 2024",
    description: "Reconnect with fellow graduates and current students during the Alumni Meet.",
    image: "",
  },
  {
    title: "Open House",
    description: "Get an insider view of campus life and academic offerings at the University Open House.",
    image: "",
  },
  {
    title: "Hackathon",
    description: "Compete in the university’s tech-driven Hackathon and bring your ideas to life.",
    image: "",
  },
  {
    title: "Cultural Festival",
    description: "Celebrate diverse cultures with music, food, and performances at the University Cultural Festival.",
    image: "",
  },
  {
    title: "Guest Lecture Series",
    description: "Listen to inspiring talks from industry leaders and distinguished professors.",
    image: "",
  }
];

const HomePage = () => {
  return (
    <div>
        <Navbar />

      <WrapperComponent>
        <Hero props={hero1}>
          <Searchbar searchPlaceholder={hero1.searchPlaceholder} />
        </Hero>
      </WrapperComponent>

      <WrapperComponent>
        <CardSlider cards={cards} />
      </WrapperComponent>

      <WrapperComponent>
        <Hero props={hero2} />
      </WrapperComponent>

      <WrapperComponent>
        <Footer />
      </WrapperComponent>
    </div>
  );
};

export default HomePage;
