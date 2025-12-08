import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Menu from "./components/menu/Menu.jsx";
import Register from "./components/register/Register.jsx";
import useAuth from "./hooks/useAuth.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import "mdb-ui-kit/css/mdb.min.css";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate} from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import "./App.css"

// Initialise MDB (pour Dropdowns, Collapse etc.)
initMDB({ Dropdown, Collapse });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Root />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/", { replace: true });
  }

  return <Outlet />;
}

function Root() {
  return (
    <>
      <Menu />
      <div className="d-flex align-items-center justify-content-between mt-3 app-container">
         <div className="main-content">
             <Outlet />
         </div>
      </div>
        <Footer />
    </>
  );
}

export default App;
