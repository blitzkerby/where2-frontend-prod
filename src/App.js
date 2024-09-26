import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "./components/reusable/Card";
import SearchBar from "./components/reusable/SearchBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import VerificationPage from "./pages/VerificationPage";
import JobPage from "./pages/JobPage";
import JobDetailPage from "./pages/JobDetailPage";
import Profile from "./components/reusable/Profile";
import UserProfile from "./components/UserProfile";
import ScholarshipListPage from "./pages/ScholarshipListPage";

  const router = createBrowserRouter([
    {
      path:'/',
      element:<HomePage/>
    },
    { path: "/login",element: <LoginPage />},
    { path: "/signup",element: <RegisterPage />},
    { path: "/forget-password", element: <ForgetPasswordPage />},
    { path: "/reset-password/:token", element: <ResetPasswordPage />},
    { path: "/terms-and-conditions", element: <TermsAndConditionsPage/>},
    { path: "/signup/verification", element: <VerificationPage/> },
    { path: "/dashboard/:userName", element: <UserProfile /> },
    { path: "/job", element: <JobPage /> },
    { path: "/job-detail/:jobId", element: <JobDetailPage />},
    { path: '/profile', element: <UserProfile /> },
    { path: '/scholarships', element: <ScholarshipListPage />},
  ])
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
