import { createBrowserRouter } from "react-router";
import Layout from "./Layout/Layout";
import Home from "./views/Home";
import Login from "./views/Login";

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
            }
        ]
    }
])

export default router;