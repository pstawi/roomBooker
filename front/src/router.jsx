import { createBrowserRouter } from "react-router";
import Layout from "./Layout/Layout";
import Home from "./views/Home";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout />,
        children : [
            {
                path : "/",
                element : <Home />
            }
        ]
    }
])

export default router;