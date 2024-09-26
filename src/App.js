import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Card from "./components/reusable/Card";
// import SearchBar from "./components/reusable/SearchBar";
import HomePage from "./pages/HomePage";
import UserProfile from "./components/UserProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import VerificationPage from "./pages/VerificationPage";
import DashboardComponent from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <HomePage />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  { path: "/login",element: <LoginPage />},
  { path: "/signup",element: <RegisterPage />},
  { path: "/forget-password", element: <ForgetPasswordPage />},
  { path: "/reset-password/:token", element: <ResetPasswordPage />},
  { path: "/terms-and-conditions", element: <TermsAndConditionsPage/>},
  { path: "/signup/verification", element: <VerificationPage/> },
  { path: "/dashboard/:userName", element: <DashboardComponent/> },
  { path: "/profile/:userName", element: <UserProfile/> }
])

function App() {
  return <RouterProvider router={router}>
    <QueryClientProvider client={queryClient}></QueryClientProvider>
  </RouterProvider>;
}

export default App;
