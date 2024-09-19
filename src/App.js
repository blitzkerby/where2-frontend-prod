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
    {
      path:'/profile',
      element:<UserProfile/>
    },

  ])
  
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
