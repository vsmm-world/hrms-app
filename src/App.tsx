import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
          <Footer />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar />
          <Contact />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Navbar />
          <Register />
          <Footer />
        </>
      ),
    },
    {
      path: "/user/dashboard",
      element: (
        <>
          <Navbar />
          <UserDashboard />
          <Footer />
        </>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <>
          <Navbar />
          <AdminDashboard />
          <Footer />
        </>
      ),
    },
    {
      path: "/employee/dashboard",
      element: (
        <>
          <Navbar />
          <EmployeeDashboard />
          <Footer />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
