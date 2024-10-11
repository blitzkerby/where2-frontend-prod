import VerificationComponent from "./../components/authentication/VerificationComponent";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";

const VerificationPage = () => {
    return (
        <div>
            <Navbar/>
            <VerificationComponent />
            <Footer />
        </div>
    );
};

export default VerificationPage;