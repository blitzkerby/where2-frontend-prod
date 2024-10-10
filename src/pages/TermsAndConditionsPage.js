import TermsAndConditionsComponent from "./../components/authentication/TermsAndConditions";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";

const TermsAndConditionsPage = () => {
    return (
        <div>
            <Navbar/>
            <TermsAndConditionsComponent />
            <Footer />
        </div>
    )
}

export default TermsAndConditionsPage;