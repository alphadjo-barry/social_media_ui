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

import "./App.css";
import { useContext } from "react";

initMDB({ Dropdown, Collapse });
import { ThemeContext } from "@hooks/useTheme.jsx";
import Validation from "@components/account_validation/Validation.jsx";
import Forgot from "@components/forgot/Forgot.jsx";
import Publication from "@components/publications/Publication.jsx";
import Profile from "@components/profiles/Profile.jsx";
import {UserInfoProvider} from "./providers/UserInfoContexte.jsx";

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
    path: "forgot-password",
    element: <Forgot/>
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
          {
              path: "publication",
              element: <Publication/>,
          },
          {
              path: "profile",
              element: <Profile/>
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

  return (
    <>
      <UserInfoProvider>
        <Menu />
        <div>
          <div className="d-flex align-items-center justify-content-between app-container mt-5">
            <div className="main-content">
              <Outlet />
            </div>
          </div>

        </div>
      </UserInfoProvider>
    </>
  );
}

export default App;
