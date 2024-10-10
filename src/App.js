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
import HealthPage from "./pages/HealthPage";
import PublicOnlyROute from "./components/reusable/PublicOnlyRoute";
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
  { path: "/login",element: <PublicOnlyROute><LoginPage /></PublicOnlyROute>},
  { path: "/signup",element: <PublicOnlyROute><RegisterPage /></PublicOnlyROute>},
  { path: "/forget-password", element: <PublicOnlyROute><ForgetPasswordPage /></PublicOnlyROute>},
  { path: "/reset-password/:token", element: <ResetPasswordPage />},
  { path: "/terms-and-conditions", element: <PublicOnlyROute><TermsAndConditionsPage/></PublicOnlyROute>},
  { path: "/signup/verification", element: <PublicOnlyROute><VerificationPage/></PublicOnlyROute> },
  { path: "/dashboard/:userName", element: <DashboardComponent/> },
  { path: "/profile/:userName", element: <UserProfile/> },
  { path: "/community", element: <DiscussionsPage/> },
  { path: "/health", element: <HealthPage/> }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

