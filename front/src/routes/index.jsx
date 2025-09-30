import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import PostDetails from './views/PostDetails';
import EditPost from './views/EditPost';
// Importez vos autres composants ici

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            {/* Ajoutez vos autres routes ici */}
        </Routes>
    );
};

export default AppRoutes;