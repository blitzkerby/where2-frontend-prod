const Logout = () => {
    if (window.confirm('Are you sure you want to Logout?') === true) {
        localStorage.removeItem('authData')
        window.location.reload()
    } 
    return 
    
}

export default Logout