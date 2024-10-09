import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserProfile from "./components/accountUtilities/UserProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import VerificationPage from "./pages/VerificationPage";
import DashboardComponent from "./components/accountUtilities/sidebarComponents/Admin/Dashboard";
import DiscussionsPage from "./pages/DiscussionPage";
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
  { path: "/profile/:userName", element: <UserProfile/> },
  { path: "/community", element: <DiscussionsPage/> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

