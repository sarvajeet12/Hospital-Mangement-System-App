// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// react router dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// context store
import ContextProvider from "./context/store.jsx";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Appointment from "./pages/appointment.jsx";
import Doctors from "./pages/doctors.jsx";
import SignUp from "./pages/singup.jsx";
import Login from "./pages/login.jsx";
import Error from "./pages/error.jsx";
import { AdminDashboard } from "./pages/admin/dashboard.jsx";
import AdminLayout from "./pages/admin/admin-layout.jsx";
import Message from "./pages/admin/message.jsx";
import AddDoctors from "./pages/admin/add-doctors.jsx";
import Doctor from "./pages/admin/doctor.jsx";
import DoctorReadMore from "./components/core/doctors-page/doctor-read-more.jsx";
import YourAppointment from "./pages/your-appointment.jsx";
import UpdateDoctorProfile from "./components/core/admin-dashboad-page/update-doctor-profile.jsx";
import AppointStatus from "./components/core/admin-dashboad-page/appoint-status.jsx";
import VerifyEmail from "./pages/verify-email.jsx";
import ForgotPassword from "./pages/forgot-password.jsx";


// ------------------------------------------------------------ ROUTER -----------------------------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/appointment", element: <Appointment /> },
      { path: "/all-doctors", element: <Doctors /> },
      { path: "/register", element: <SignUp /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/doctors/read-more/:id", element: <DoctorReadMore /> },
      { path: "/your-appointment", element: <YourAppointment /> },

      { path: "*", element: <Error /> },
      {
        element: <AdminLayout />,
        children: [
          { path: "admin/dashboard", element: <AdminDashboard /> },
          { path: "admin/messages", element: <Message /> },
          { path: "admin/add/doctors", element: <AddDoctors /> },
          { path: "admin/doctors-list", element: <Doctor /> },
          {
            path: "admin/doctor-update/:id",
            element: <UpdateDoctorProfile />,
          },
          { path: "admin/appoint-status/:id", element: <AppointStatus /> },
          { path: "*", element: <Error /> },
        ],
      },
    ],
  },
]);



// ---------------------------------------------------------- RENDER --------------------------------------------------
createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClickrtl={true}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="colored"
      bodyClassName="toastBody"
    />
  </ContextProvider>
);
