import { createBrowserRouter } from "react-router";
import Layout from "./Layout/Layout";
import Home from "./views/Home";
import Login from "./views/Login";
import CGU from "./views/CGU";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/Login",
                element: <Login />
            },
            {
                path: "/CGU",
                element: <CGU />
            }
        ]
    }
])

export default router;