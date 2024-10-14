// components
import Navbar from "../components/reusable/Navbar";
import Footer from "../components/reusable/Footer";
import Hero from "../layouts/Hero";
import Searchbar from "../components/reusable/SearchBar";
import WrapperComponent from "../components/reusable/WrapperComponent";
import CardFeatureSlider from "../components/reusable/CardFeatureSlider";
import SaveSection from "../components/reusable/Saves";
import JoinUs from "../components/reusable/JoinUs";
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
  mainImageSrc: "https://opendevelopmentcambodia.net/wp-content/uploads/2020/03/87437796_3033155613385703_1957382099056984064_o.jpg",
  mainImageAlt: "University building",
  onSearch: () => {},
};

// background: linear-gradient(180deg, #E3E3E3 0%, #EEEEEE 19%, #FFFFFF 82%, #F6F6F6 100%);

const hero2 = {
  title: "PURSUE YOUR CAREER.",
  subtitle: "By supporting yourself.",
  backgroundGradient: "from-blue-100",
  titleColor: "text-blue-900",
  subtitleColor: "text-blue-600",
  mainImageSrc: "https://opendevelopmentcambodia.net/wp-content/uploads/2020/03/87437796_3033155613385703_1957382099056984064_o.jpg",
  mainImageAlt: "University building",
  button:"Find part time jobs",
  onSearch: () => {},
};
const header =[
  {
    suggested: "SUGGESTED FOR YOU"
  }
]
const headerCardFeature =[
  {
    suggested: "OUR FEATURE"
  }
]
const cards = [
  {
    title: "Scholarships",
    description:
      "Explore the latest scholarships available for Cambodian students.",
    image: "https://qtxasset.com/quartz/qcloud5/media/image/fiercepharma/1619625035/22720111227_2a042d40c2_k.jpg/22720111227_2a042d40c2_k.jpg?VersionId=x3K_RGWSODPPttid4VR0oZR8wuzsyefC",
  },
  {
    title: "University Fair 2024",
    description:
      "Join us at the University Fair to learn more about programs and meet representatives from top universities.",
    image: "https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/photo_2022-12-09_09-24-30.jpg",
  },
  {
    title: "Career Expo",
    description:
      "Attend the Career Expo and meet potential employers from various industries.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgwYhRvBfq_Q7G0Uf_H1wMVSBq0gwnPj79IA&s",
  },
  {
    title: "Research Conference",
    description:
      "Discover groundbreaking research presented by university students and professors.",
    image: "https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/rhb1.jpg",
  },
  {
    title: "Student Orientation",
    description:
      "New to campus? Don’t miss the Student Orientation to get familiar with the university.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUC4v9hYvYmpvpAIPoj5H5u29vyvtCsaRRZw&s",
  },
  {
    title: "Alumni Meet 2024",
    description:
      "Reconnect with fellow graduates and current students during the Alumni Meet.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9h5_4wrvXgm6Xbl2I0xYii3kpt0xgisWt0g&s",
  },
  {
    title: "Open House",
    description:
      "Get an insider view of campus life and academic offerings at the University Open House.",
    image: "https://paragoniu.edu.kh/wp-content/uploads/2020/09/Virtual-Open-House-2020.jpg",
  },
  {
    title: "Hackathon",
    description:
      "Compete in the university’s tech-driven Hackathon and bring your ideas to life.",
    image: "https://media.startupcambodia.gov.kh/platform/core/program/images/Turing_Hackathon_Cycle_4_Inspiration_to_Digital_Innovation.jpg",
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
        <CardSlider cards={cards} header={header} />
      </WrapperComponent>
      <WrapperComponent>
        <Hero props={hero2} />
      </WrapperComponent>
      <WrapperComponent>
        <CardFeatureSlider cardFeature={cardFeature} header={headerCardFeature} />
      </WrapperComponent>
      <WrapperComponent>
        <SaveSection/>
      </WrapperComponent>
      <WrapperComponent>
        <JoinUs/>
      </WrapperComponent>
      <WrapperComponent>
        <Footer />
      </WrapperComponent>
    </div>
  );
};

export default HomePage;


