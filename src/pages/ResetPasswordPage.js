import ResetPasswordComponent from "./../components/authentication/ResetPassword";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";

const ResetPasswordPage = () => {
    return (
        <div>
            <Navbar/>
            <ResetPasswordComponent />
            <Footer/>
        </div>
    )
}

export default ResetPasswordPage;