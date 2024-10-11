import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Card from "./components/reusable/Card";
// import SearchBar from "./components/reusable/SearchBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UniversityPage from "./pages/UniversityPage";
import ScholarshipPage from "./pages/ScholarshipPage";
import VerificationPage from "./pages/VerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ScholarshipDetailPage from "./pages/ScholarshipDetailPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

import UserProfile from "./components/UserProfile";
import DashboardComponent from "./components/Dashboard";
import JobPage from "./pages/JobPage";
import JobDetailPage from "./pages/JobDetailPage";
import LivelihoodPage from "./pages/LivelihoodPage";
import UniversityDetail from "./pages/UniversityDetail";
import ErrorPage from "./pages/ErrorPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/list",
    children: [
      {
        path: "university",
        children: [
          { path: "", element: <UniversityPage /> },
          { path: "search", element: <UniversityPage /> },
          { path: ":id", element: <UniversityDetail /> }
        ]
      },
      // {
      //   path: "/scholarship",
      //   children: [
      //     { path: "", element: <ScholarshipPage /> },
      //     { path: "search", element: <ScholarshipPage /> },
      //     { path: ":id", element: <ScholarshipDetail /> }
      //   ]
      // }
    ]
  },  
  { path: "/jobs", element: <JobPage /> },
  { path: "/login",element: <LoginPage />},
  { path: "/signup",element: <RegisterPage />},
  { path: "/scholarships", element: <ScholarshipPage/>},
  { path: "/profile/:userName", element: <UserProfile /> },
  { path: "/job-detail/:jobId", element: <JobDetailPage/> },
  { path: "/forget-password", element: <ForgetPasswordPage />},
  { path: "/signup/verification", element: <VerificationPage/> },
  { path: "/dashboard/:userName", element: <DashboardComponent/> },
  { path: "/profile/:userName", element: <UserProfile /> },
  { path:"/livelihood", element: <LivelihoodPage />},
  { path: "/reset-password/:token", element: <ResetPasswordPage />},
  { path: "/terms-and-conditions", element: <TermsAndConditionsPage/>},
  { path: "/scholarship/:id", element: <ScholarshipDetailPage/>},

]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

