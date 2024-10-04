const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
const ENV = process.env.NODE_ENV || "development";

const config = {
  apiUrl: API_URL,
  env: ENV,
  isDevelopment: ENV === "development",
  isProduction: ENV === "production",
  auth: {
    loginUrl: `${API_URL}/api/users/login`,
    registerUrl: `${API_URL}/api/users/signup`,
    verifyAccountUrl: `${API_URL}/api/users/signup/verifyAccount`,
    sendVerificationCode: `${API_URL}/api/users/signup/sendVerificationCode`,
    resendVerificationCodeUrl: `${API_URL}/api/users/signup/resendVerificationCode`,
    sendWelcomeEmailUrl: `${API_URL}/api/users/signup/sendWelcomeEmail`,
    logoutUrl: `${API_URL}/api/users/logout`,
    forgotPasswordUrl: `${API_URL}/api/users/forgotPassword`,
    resetPasswordUrl: (token) => `${API_URL}/api/users/resetPassword/${token}`,
    refreshTokenUrl: `${API_URL}/api/users/refreshToken`,
    fetchProfileUrl: (username) => `${API_URL}/api/users/profile/${username}`,
    getUserRole: `${API_URL}/api/users/login/getRole`,
  },
  user: {
    upload: `${API_URL}/api/upload`,
    visitorTrack: `${API_URL}/api/visitors/track-visit`,
    visits: `${API_URL}/api/visitors/visits`
  },
  profile: {
    getMyProfile: (userId) => `${API_URL}/api/users/profile/${userId}`
  },
  analytics: {
    getAllUsers : `${API_URL}/api/users/user-list`,
    deleteUserById : (userId) =>`${API_URL}/api/users/delete-user/${userId}`
  },
  universities: {
    getAllUniversities : `${API_URL}/api/universities/`
  },
   // Jobs
   job: {
    getAllJob: `${ API_URL }/api/jobs`,
     getAssociatedCompany: (jobId) => `${ API_URL }/api/jobs/associatedCompany/${ jobId }`,
  },
   // Favorites
  favorite: {
    addFavorite: `${ API_URL }/api/favorites/addFavorite`,
    getFavorite:(userId,category) => `${ API_URL }/api/favorites/${userId}/${category}`,
    
  }

};
export default config; 