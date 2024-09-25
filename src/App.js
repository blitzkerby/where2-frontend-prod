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
    { path: "/dashboard/:userName", element: <HomePage /> },
    { path: "/job", element: <JobPage /> },
    { path: "/job-detail/:id", element: <JobDetailPage />},
  ])
  
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
