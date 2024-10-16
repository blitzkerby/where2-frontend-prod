import DiscussionsComponent from "./../components/DiscussionsComponent";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";

const DiscussionPage = () => {
    return (
        <>
            <Navbar/>
            <DiscussionsComponent />
            <Footer/>
        </>
    )
}

export default DiscussionPage;