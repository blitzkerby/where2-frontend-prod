import Footer from "../components/reusable/Footer";
import Navbar from "../components/reusable/Navbar";
import { useLocation } from "react-router-dom";
import VisitTracker from "../components/reusable/VisitorTracker";


const HomePage = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar/>
      <VisitTracker path={location.pathname}/>
      <Footer/>
    </div>
  );
};

export default HomePage;