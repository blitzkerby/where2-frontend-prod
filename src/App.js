import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Card from "./components/reusable/Card";
// import SearchBar from "./components/reusable/SearchBar";
import HomePage from "./pages/HomePage";
import Profile from "./components/reusable/Profile";
import UserProfile from "./components/UserProfile";


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

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
