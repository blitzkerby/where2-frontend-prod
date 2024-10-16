import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate();

    if (window.confirm('Are you sure you want to Logout?') === true) {
        localStorage.removeItem('authData')
        window.location.reload();
        navigate('/')
    } 
    return 
    
}

export default Logout