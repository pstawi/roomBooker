import { createBrowserRouter } from "react-router";
import Layout from "./views/Layout";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout />
    }
])

export default router;