import RegisterComponent from "../components/authentication/RegisterComponent";
import Footer from "../components/reusable/Footer";
import Navbar from "../components/reusable/Navbar";

const RegisterPage = () => {
    return (
        <div>
            <Navbar/>
            <RegisterComponent />
            <Footer />
        </div>
    )
}

export default RegisterPage;