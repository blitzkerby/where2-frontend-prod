const getEnvVariable = (key, defaultValue = "") => {
    if (typeof process !== "undefined" && process.env && process.env[key]) {
      return process.env[key];
    }
    if (defaultValue !== "") {
      console.warn(
        `Environment variable ${key} is not set. Using default value.`
      );
      return defaultValue;
    }
    console.error(
      `Environment variable ${key} is not set and no default value provided.`
    );
    return "";
  };
  
  const API_URL = getEnvVariable("REACT_APP_API_URL", "http://localhost:4000");
  const ENV = getEnvVariable("NODE_ENV", "development");
  
  const config = {
    // 1. Authentication
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
    // You can add more variables here
    user: {
      upload: `${API_URL}/api/upload`,
      visitorTrack: `${API_URL}/api/visitors/track-visit`,
      visits: `${API_URL}/api/visitors/visits`
    }
  };
  
  export default config;