import Health from "./../components/Health";
import Footer from "./../components/reusable/Footer";
import HealthNavbar from "./../components/reusable/HealthNavbar";
import WrapperComponent from "./../components/reusable/WrapperComponent";

const LoginPage = () => {
    return (
        <div>
            <HealthNavbar/>
            <WrapperComponent>
            <Health/>
            </WrapperComponent>
            <Footer/>
        </div>
    )
}

export default LoginPage;