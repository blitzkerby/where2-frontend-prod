import ForgetPasswordComponent from "../components/authentication/ForgetPassword";
import Footer from "../components/reusable/Footer";
import Navbar from "../components/reusable/Navbar";

const ForgetPasswordPage = () => {
    return (
        <div>
            <Navbar/>
            <ForgetPasswordComponent />
            <Footer/>
        </div>
    )
}

export default ForgetPasswordPage;