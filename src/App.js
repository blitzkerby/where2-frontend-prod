import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "./components/reusable/Card";
import SearchBar from "./components/reusable/SearchBar";
import HomePage from "./pages/HomePage";


  const router = createBrowserRouter([
    {
      path:'/',
      element:<HomePage/>
    }
  ])
  
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
