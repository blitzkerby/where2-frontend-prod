const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
const ENV = process.env.REACT_APP_NODE_ENV || "development";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || "clientId";

const config = {
  apiUrl: API_URL,
  env: ENV,
  socketServer: 'ws://localhost:4000',
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
    getUserRole: `${ API_URL }/api/users/login/getRole`,
    updatePassword: (userId) => `${ API_URL }/api/users/updatePassword/${userId}`
  },
  user: {
    upload: `${API_URL}/api/upload`,
    visitorTrack: `${API_URL}/api/visitors/track-visit`,
    visits: `${API_URL}/api/visitors/visits`,
  },
  profile: {
    getMyProfile: (userId) => `${API_URL}/api/users/profile/${userId}`,
    getPublicProfile: (userId) =>
      `${API_URL}/api/users/profile/public/${userId}`,
    getAdminContentList : (adminId) => `${API_URL}/api/users/content-list/${adminId}`
  },
  analytics: {
    getAllUsers: `${API_URL}/api/users/user-list`,
    deleteUserById: (userId) => `${API_URL}/api/users/delete-user/${userId}`,
    reactivateUserById: (userId) => `${API_URL}/api/users/reactivate-user/${userId}`
  },
  photo: {
    getS3Url: `${API_URL}/api/user/s3Url`,
    uploadProfilePicture: `${API_URL}/api/user/profile-picture`,
    uploadPublicPhoto: `${API_URL}/api/user/public`,
    fetchPublicPhotoForPost: (userId, postId) => `${API_URL}/api/user/${userId}/public/${postId}`,
    fetchProfilePicture: (userId) =>
      `${API_URL}/api/user/${userId}/profile-picture`,
    fetchBatchProfilePictures: `${API_URL}/api/user/users/batch-profile-pictures`,
  },
  community: {
    createDiscussion: `${API_URL}/api/discussion`,
    getDiscussions: `${API_URL}/api/discussions`,
    getUserDiscussions: (userId) => `${API_URL}/api/discussions/${userId}`,
    addComment: (discussionId, commentId) =>
      `${API_URL}/api/discussions/${discussionId}/comment/${commentId}`,
    getAllComments: (discussionId) =>
      `${API_URL}/api/discussions/${discussionId}/comments`,
    deleteDiscussion: (discussionId) =>
      `${API_URL}/api/discussion/${discussionId}`,
    deleteComment: (commentId) => `${API_URL}/api/discussion/comment/${commentId}`,
  },
 job : {
  getAllJob: `${API_URL}/api/jobs/job-list`,
  getAssociatedCompany: (jobId) => `${API_URL}/api/jobs/associatedCompany/${jobId}`,
  approveJob: (jobId) => `${API_URL}/api/jobs/approve/${jobId}`,
  disapproveJob : (jobId) => `${API_URL}/api/jobs/disapprove/${jobId}`,
  getJob: (jobId) => `${API_URL}/api/jobs/${jobId}`,           
},
  favorite: {
    addFavorite: `${API_URL}/api/favorites/addFavorite`,
    getFavorite: (userId, category) =>
      `${API_URL}/api/favorites/${userId}/${category}`,
    removedFavorite: (cardId, category) =>
      `${API_URL}/api/favorites/${cardId}/${category}`,
  },
  list:{
    getAllList: (model) => `${API_URL}/api/list/${model}`,
  },
  universities: {
    getAllUniversity : `${API_URL}/api/list/university`,
    getUniversityList : `${API_URL}/api/detail/university/university-list`,
    getUniversityById : `${API_URL}/api/detail/university`,
    approveUniversity : (universityId) => `${API_URL}/api/university/approve/${universityId}`,
    disapproveUniversity : (universityId) => `${API_URL}/api/university/disapprove/${universityId}`,
  },
  scholarships: {
    getAllScholarships: `${API_URL}/api/list/scholarship`,
    getScholarshipById: `${API_URL}/api/detail/scholarship`,
  },
  accommodation: {
    getAllAccommodation: `${API_URL}/api/list/accommodation`,
    getAccommodationById: `${API_URL}/api/accommodation`,
  },
  search: {
    searchAny: `${API_URL}/api/`,
  },
  list: {
    getAllList: (model) => `${API_URL}/api/list/${model}`,
  },
  chatbot: {
    sendMessage: `${API_URL}/api/ai/summary`,
  },
  payment: {
    makePayment: `${API_URL}/api/bakong-payment`,
    createPaypalOrder: `${API_URL}/api/create-paypal-order`,
    capturePaypalOrder: `${API_URL}/api/capture-paypal-order`,
    createSubscription: `${API_URL}/api/create-subscription`,
  },
  paypal: {
    clientID: CLIENT_ID,
  },
  dashboard: {
    getVerificationData: `${API_URL}/api/dashboard/get-verification-data`,
    getDiscussionsPerDay: `${API_URL}/api/dashboard/discussions-per-day`,
    getDeviceDistribution: `${API_URL}/api/dashboard/device-distribution`,
    getActiveAndViews: `${API_URL}/api/dashboard/active-and-views`,
    getUserCounts: `${API_URL}/api/dashboard/user-counts-by-city`,
    getCommentsPerDay: `${API_URL}/api/dashboard/comments-by-day`,
  },
  health: {
    getAllHealthArticles: `${API_URL}/api/health/health-articles`,
    getHealthArticleById: (id) => `${API_URL}/api/health/health-articles/${id}`,
  },
  contentCreation : {
    createUniversity : `${API_URL}/api/detail/university/addUniversity`,
    createJob : `${API_URL}/api/jobs/addJob`,
    createAccomodation : `${API_URL}`
  }
}
export default config;
