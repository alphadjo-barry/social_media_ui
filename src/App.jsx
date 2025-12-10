import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "@components/login/Login.jsx";
import Menu from "@components/menu/Menu.jsx";
import Register from "@components/register/Register.jsx";
import useAuth from "@hooks/useAuth.jsx";
import Dashboard from "@components/dashboard/Dashboard.jsx";
import "mdb-ui-kit/css/mdb.min.css";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@components/footer/Footer.jsx";
import "./App.css";
import { useContext } from "react";

initMDB({ Dropdown, Collapse });
import { ThemeContext } from "@hooks/useTheme.jsx";
import Validation from "@components/account_validation/Validation.jsx";

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
    path: "account-validation",
    element: <Validation/>
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
          }
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

  if (isAuthenticated === null) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

function Root() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Menu />
      <div className={theme}>
        <div className="d-flex align-items-center justify-content-between app-container">
          <div className="main-content">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
