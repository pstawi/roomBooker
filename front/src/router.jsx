import { createBrowserRouter } from "react-router";
import Layout from "./Layout/Layout";
import Home from "./views/Home";
import Login from "./views/Login";
import CreatePost from "./views/CreatePost";
import PostDetails from "./views/PostDetails";
import EditPost from "./views/EditPost";

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
                path: "/create-post",
                element: <CreatePost />
            },
            {
                path: "/posts/:id",
                element: <PostDetails />
            },
            {
                path: "/edit-post/:id",
                element: <EditPost />
            }
        ]
    }
])

export default router;