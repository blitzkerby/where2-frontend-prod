import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UniversityPage from "./pages/UniversityPage";
import VerificationPage from "./pages/VerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

import UserProfile from "./components/UserProfile";
import DashboardComponent from "./components/Dashboard";
import JobPage from "./pages/JobPage";
import JobDetailPage from "./pages/JobDetailPage";
import LivelihoodPage from "./pages/LivelihoodPage";
import UniversityDetail from "./pages/UniversityDetail";

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
  { path: "/universities", element: <UniversityPage />},
  { path: "/universities/:id", element: <UniversityDetail /> },
  { path: "/login",element: <LoginPage />},
  { path: "/signup",element: <RegisterPage />},
  { path: "/forget-password", element: <ForgetPasswordPage />},
  { path: "/reset-password/:token", element: <ResetPasswordPage />},
  { path: "/terms-and-conditions", element: <TermsAndConditionsPage/>},
  { path: "/signup/verification", element: <VerificationPage/> },
  { path: "/dashboard/:userName", element: <DashboardComponent/> },
  { path: "/profile/:userName", element: <UserProfile /> },
  { path: "/jobs", element: <JobPage /> },
  { path: "/job-detail/:jobId", element: <JobDetailPage /> },
  { path:"/livelihood", element: <LivelihoodPage />},
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

