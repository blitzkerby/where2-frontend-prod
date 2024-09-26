import { createBrowserRouter, RouterProvider } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Card from "./components/reusable/Card";
import SearchBar from "./components/reusable/SearchBar";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD
=======
=======
>>>>>>> 6aad705 (ft#8-studentLoan: added the route for studentLoan Page)
// import Card from "./components/reusable/Card";
// import SearchBar from "./components/reusable/SearchBar";
// import Card from "./components/reusable/Card";
// import SearchBar from "./components/reusable/SearchBar";
=======
=======
>>>>>>> 441e621 (ft#7.1-job: REBASE: develop branch)
import Card from "./components/reusable/Card";
import SearchBar from "./components/reusable/SearchBar";
import HomePage from "./pages/HomePage";
>>>>>>> 34efb6a (ft2.1-scholashippage: trying to rebase 5th time)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import VerificationPage from "./pages/VerificationPage";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import JobPage from "./pages/JobPage";
import JobDetailPage from "./pages/JobDetailPage";
=======
import Profile from "./components/reusable/Profile";
>>>>>>> aafd85a (User Profile modification & Side bar)
import UserProfile from "./components/UserProfile";


<<<<<<< HEAD
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
<<<<<<< HEAD
    { path: "/login",element: <LoginPage />},
    { path: "/signup",element: <RegisterPage />},
    { path: "/forget-password", element: <ForgetPasswordPage />},
    { path: "/reset-password/:token", element: <ResetPasswordPage />},
    { path: "/terms-and-conditions", element: <TermsAndConditionsPage/>},
    { path: "/signup/verification", element: <VerificationPage/> },
    { path: "/dashboard/:userName", element: <UserProfile /> },
    { path: "/job", element: <JobPage /> },
    { path: "/job-detail/:id", element: <JobDetailPage />},
    
=======
    {
      path:'/profile',
      element:<UserProfile/>
    },

>>>>>>> aafd85a (User Profile modification & Side bar)
  ])
  
=======
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
  { path: '/scholarships', element: <ScholarshipListPage />},
])

>>>>>>> 54fa07c (MODIFIED : App.js)
=======
import ScholarshipListPage from "./pages/ScholarshipListPage";
=======
=======
>>>>>>> 692fc12 (ft#7.1-job: added the job detail component and job detail page)
=======
>>>>>>> 441e621 (ft#7.1-job: REBASE: develop branch)
import ScholarshipListPage from "./pages/ScholarshipListPage";import JobPage from "./pages/JobPage";
=======
import ScholarshipListPage from "./pages/ScholarshipListPage";
>>>>>>> ebbe46e (ft#7.1-job: Resolve the error)
import JobPage from "./pages/JobPage";
import JobDetailPage from "./pages/JobDetailPage";

>>>>>>> 77c00a4 (ft#7.1-job: added JobList, JobPage and the path for job)

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
    { path: "/dashboard/:userName", element: <HomePage /> },
    { path: "/scholarships", element: <ScholarshipListPage/>},
    { path: "/job", element: <JobPage />},
    { path: "/job-detail/:id", element: <JobDetailPage />},
  ])
  
>>>>>>> 34efb6a (ft2.1-scholashippage: trying to rebase 5th time)
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
