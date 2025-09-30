import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import CreatePostCard from '../components/CreatePostCard';
import { getAllPosts } from '../services/PostServices';

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                // S'assurer que posts est un tableau
                const postsArray = Array.isArray(data) ? data : [];
                setPosts(postsArray);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors du chargement des posts:', err);
                setError('Une erreur est survenue lors du chargement des posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
                Actualités
            </h1>
            
            {posts.length === 0 ? (
                <div className="text-center py-8 text-gray-500 ">
                    Aucune actualité disponible pour le moment
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CreatePostCard onClick={() => navigate('/create-post')} />
                    {posts.map(post => (
                        <Card 
                            key={post.id} 
                            post={post} 
                            onDelete={(deletedId) => {
                                setPosts(posts.filter(p => p.id !== deletedId));
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;