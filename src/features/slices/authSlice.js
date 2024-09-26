import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  import axios from "axios";
import config from "../../config"
  
  const handleAsyncError = (error, defaultMessage) => {
    return error.response?.data?.message || defaultMessage;
  };
  
  // 1. Register user
  export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
      try {
        const formattedUserData = {
          ...userData,
          dateOfBirth: userData.dateOfBirth
            ? new Date(userData.dateOfBirth).toISOString().split('T')[0]
            : null,
        };
  
        if (config.isDevelopment) {
          console.log("Registering user with data:", formattedUserData);
        }
  
        const response = await axios.post(config.auth.registerUrl, formattedUserData);
        return response.data;
      } catch (error) {
        if (config.isDevelopment) {
          if (error.response) {
            console.error("Registration error details:", {
              message: error.message,
              status: error.response.status,
              headers: error.response.headers,
              data: error.response.data,
            });
          } else if (error.request) {
            console.error("No response received:", {
              message: error.message,
              request: error.request,
            });
          } else {
            console.error("Error during registration request setup:", error.message);
          }
        }
  
        return thunkAPI.rejectWithValue(
          handleAsyncError(error, "Failed to initiate registration. Please try again.")
        );
      }
    }
  );
  
  
  export const sendVerificationCode = createAsyncThunk(
    "auth/sendVerificationCode",
    async ({ email }, thunkAPI) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return thunkAPI.rejectWithValue("Invalid email format");
      }
  
      try {
        if (config.isDevelopment) {
          console.log("Sending verification code for email:", email);
        }
        const response = await axios.post(config.auth.sendVerificationCodeUrl, { email });
        
        if (config.isDevelopment) {
          console.log("Server response:", response.data);
        }
        
        if (response.data && typeof response.data.message === 'string') {
          return response.data.message;
        } else {
          return "Verification code sent successfully.";
        }
      } catch (error) {
        // Log the error in both development and production
        console.error("Error sending verification code:", error);
  
        if (axios.isAxiosError(error) && !error.response) {
          // Network error
          return thunkAPI.rejectWithValue("Network error. Please check your internet connection.");
        }
  
        return thunkAPI.rejectWithValue(
          handleAsyncError(error, "Failed to send verification code. Please try again.")
        );
      }
    }
  );
  
  
  // 1.1. Verify account
  export const verifyAccount = createAsyncThunk(
    "auth/verifyAccount",
    async ({ verificationCode }, thunkAPI) => {
      try {
        if (config.isDevelopment) {
          console.log("Verification code being sent:", verificationCode);
        }
        const response = await axios.post(
          config.auth.verifyAccountUrl,
          { verificationCode }
        );
        console.log("Server response:", response.data);
        return response.data.message || "Registration successful. You can now log in.";
      } catch (error) {
        console.error("Verification error:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(
          handleAsyncError(error, "Failed to verify account. Please try again.")
        );
      }
    })
  
  // 1.2. Resend Verification code
  export const resendVerificationCode = createAsyncThunk(
    "auth/resendVerificationCode",
    async ({ email }, thunkAPI) => {
      try {
        console.log("Resending verification code for email:", email);
        const response = await axios.post(config.auth.resendVerificationCodeUrl, { email });
        console.log("Server response:", response.data);
        return response.data.message || "Verification code resent successfully.";
      } catch (error) {
        console.error("Resend verification code error:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(
          handleAsyncError(error, "Failed to resend verification code. Please try again.")
        );
      }
    }
  );
  
  //1.3. Send welcome email
  export const sendWelcomeEmail = createAsyncThunk(
    "auth/sendWelcomeEmail",
    async ({ email }, thunkAPI) => {
      try {
        console.log("Sending welcome email to:", email);
        const response = await axios.post(config.auth.sendWelcomeEmailUrl, { email });
        console.log("Server response:", response.data);
        return response.data.message || "Welcome email sent successfully.";
      } catch (error) {
        console.error("Sending welcome email error:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(
          handleAsyncError(error, "Failed to send welcome email. Please try again.")
        );
      }
    }
  );
  
  // 2. Login user
  export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
      try {
        if (config.isDevelopment) {
          console.log("Logging in user:", { email, password });
        }
        const response = await axios.post(config.auth.loginUrl, {
          email,
          password,
        });
        const { token, id, userName, ...userData } = response.data;
        localStorage.setItem("authData", JSON.stringify({ token, id, userName }));
        return { token, id, userName, ...userData };
      } catch (error) {
        return thunkAPI.rejectWithValue(
          handleAsyncError(error, "Failed to log in. Please try again.")
        );
      }
    }
  );
  
  // 3. Logout user
  export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
      await axios.post(config.auth.logoutUrl);
      localStorage.removeItem("authData");
      return "Logged out successfully.";
    } catch (error) {
      console.error(
        "Logout failed on server, but proceeding with local logout",
        error
      );
      localStorage.removeItem("authData");
      return "Logged out locally.";
    }
  });
  
  // 4. Forget password
  export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async ({ email }, thunkAPI) => {
      try {
        console.log("Sending forgot password request with email:", email);
        const response = await axios.post(config.auth.forgotPasswordUrl, { email });
        console.log("Forgot password response:", response.data);
        return {
          message: "Password reset email sent. Please check your inbox.",
          resetToken: response.data.token,
        };
      } catch (error) {
        if (config.isDevelopment) {
          console.error("Forgot password error:", error.response?.data || error.message);
          console.error("Forgot password error:", error);
          console.error("Error response:", error.response);
          console.error("Error message:", error.message);
          console.error("Error config:", error.config);
        }
        return thunkAPI.rejectWithValue(
          handleAsyncError(
            error,
            "An unexpected error occurred. Please try again later."
          )
        );
      }
    }
  );
  
  // 5. Reset password
  export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ token, password, passwordConfirm }, thunkAPI) => {
      try {
        await axios.patch(config.auth.resetPasswordUrl(token), {
          password,
          passwordConfirm,
        });
        return "Password reset successful. You can now log in with your new password.";
      } catch (error) {
        return thunkAPI.rejectWithValue(
          handleAsyncError(error, "Failed to reset password. Please try again.")
        );
      }
    }
  );
  
  // 6. Refresh token
  export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, thunkAPI) => {
      try {
        const response = await axios.post(config.auth.refreshTokenUrl);
        const { token } = response.data;
        const authData = JSON.parse(localStorage.getItem("authData") ||  "{}");
        localStorage.setItem("authData", JSON.stringify({ ...authData, token }));
        return { token };
      } catch (error) {
        return thunkAPI.rejectWithValue(
          handleAsyncError(error, "Failed to refresh token. Please log in again.")
        );
      }
    }
  );
  
  const authAdapter = createEntityAdapter();
  
  const authSlice = createSlice({
    name: "auth",
    initialState: authAdapter.getInitialState({
      isAuthenticated: false,
      registeredEmail: "",
      status: "idle",
      verificationStatus: "idle",
      isVerified: false,
      resendStatus: "idle",
      error: null,
      message: null,
      registeredUserData: null,
    }),
    reducers: {
      clearAuthState: (state) => {
        state.isAuthenticated = false;
        state.status = "idle";
        state.verificationStatus = "idle";
        state.sendVerificationCodeStatus = "idle";
        state.resendStatus = "idle";
        state.error = null;
        state.message = null;
        state.isVerified = false;
        state.resetToken = null;
        state.registeredEmail = "";
      },
    },
    extraReducers: (builder) => {
      builder
        // Register
        .addCase(register.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.message = action.payload.message;
          state.registeredEmail = action.payload.email;
          state.registeredUserData = action.payload.userData || null;
        })
        .addCase(register.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        // Send verification codes
        .addCase(sendVerificationCode.pending, (state) => {
          state.sendVerificationCodeStatus = "loading";
          state.error = null;
          state.message = null;
        })
        .addCase(sendVerificationCode.fulfilled, (state, action) => {
          state.sendVerificationCodeStatus = "succeeded"
          state.message = action.payload;
        })
        .addCase(sendVerificationCode.rejected, (state, action) => {
          state.sendVerificationCodeStatus = "failed";
          state.error = action.payload;
        })
        // Verify Account
        .addCase(verifyAccount.pending, (state) => {
          state.verificationStatus = "loading";
          state.error = null;
          state.message = null;
          state.isVerified = false;
        })
        .addCase(verifyAccount.fulfilled, (state, action) => {
          state.verificationStatus = "succeeded";
          state.message = action.payload;
          state.isVerified = true;
        })
        .addCase(verifyAccount.rejected, (state, action) => {
          state.verificationStatus = "failed";
          state.error = action.payload;
          state.isVerified = false;
        })
        .addCase(sendWelcomeEmail.pending, (state, action) => {
          state.status = "loading";
          state.error = null;
          state.message = null;
        })
        .addCase(sendWelcomeEmail.fulfilled, (state, action) => {
          state.status = "succeeded";
          // state.message = action.payload;
        })
        .addCase(sendWelcomeEmail.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
  
        // Resend Verification Code
        .addCase(resendVerificationCode.pending, (state) => {
          state.resendStatus = "loading";
          state.error = null;
          state.message = null;
        })
        .addCase(resendVerificationCode.fulfilled, (state, action) => {
          state.resendStatus = "succeeded";
          state.message = action.payload;
        })
        .addCase(resendVerificationCode.rejected, (state, action) => {
          state.resendStatus = "failed";
          state.error = action.payload;
        })
  
        // Login
        .addCase(login.pending, (state) => {
          state.status = "loading";
          state.error = null;
          state.message = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.message = "Login successful.";
          authAdapter.upsertOne(state, {
            id: action.payload.id,
            ...action.payload,
          });
        })
        .addCase(login.rejected, (state, action) => {
          state.status = "failed";
          state.isAuthenticated = false;
          state.error = action.payload;
        })
  
        // Logout
        .addCase(logout.fulfilled, (state) => {
          state.isAuthenticated = false;
          authAdapter.removeAll(state);
        })
  
        // Forgot Password
        .addCase(forgotPassword.pending, (state) => {
          state.status = "loading";
          state.error = null;
          state.message = null;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.message = action.payload.message;
          state.resetToken = action.payload.resetToken;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
  
        // Reset Password
        .addCase(resetPassword.pending, (state) => {
          state.status = "loading";
          state.error = null;
          state.message = null;
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.message = action.payload;
        })
        .addCase(resetPassword.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
  
        // Refresh Token
        .addCase(refreshToken.fulfilled, (state, action) => {
          const userData = authAdapter
            .getSelectors()
            .selectById(state, state.entities[0]?.id);
          if (userData) {
            authAdapter.upsertOne(state, {
              ...userData,
              token: action.payload.token,
            });
          }
        })
        .addCase(refreshToken.rejected, (state) => {
          state.isAuthenticated = false;
          authAdapter.removeAll(state);
        });
    },
  });
  
  export const { clearAuthState } = authSlice.actions;
  
  export const {
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers,
  } = authAdapter.getSelectors((state) => state.auth);
  
  export default authSlice.reducer;