import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Card from "./components/reusable/Card";
// import SearchBar from "./components/reusable/SearchBar";
import HomePage from "./pages/HomePage";
import Profile from "./components/reusable/Profile";
import UserProfile from "./components/UserProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import VerificationPage from "./pages/VerificationPage";


const router = createBrowserRouter([
  {
    path:'/',
    index:true,
    element:<HomePage/>
  },
  {
    path:"/home",
    element:<HomePage/>
  },
  { path: "/login",element: <LoginPage />},
  { path: "/signup",element: <RegisterPage />},
  { path: "/forget-password", element: <ForgetPasswordPage />},
  { path: "/reset-password/:token", element: <ResetPasswordPage />},
  { path: "/terms-and-conditions", element: <TermsAndConditionsPage/>},
  { path: "/signup/verification", element: <VerificationPage/> },
  { path: "/dashboard/:userName", element: <HomePage/> },
  { path: "/profile/:userName", element: <UserProfile/> }
])

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
