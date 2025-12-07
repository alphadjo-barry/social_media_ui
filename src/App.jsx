import {createBrowserRouter, Outlet, RouterProvider} from "react-router"
import Login from "./components/login/Login.jsx";
import Menu from "./components/menu/Menu.jsx";
import Register from "./components/register/Register.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        path: "register",
        element: <Register/>
    }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

function Root(){
    return (
        <>
            <Menu/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <Outlet/>
            </div>
        </>
    );
}

export default App
