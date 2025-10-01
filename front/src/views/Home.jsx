import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import CreatePostCard from '../components/CreatePostCard';
import { getAllPosts } from '../services/PostServices';
import { getAllTypes } from '../services/TypeServices';
import { useAuth } from '../hooks/AuthContext';


const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [filterDate, setFilterDate] = useState('');
    // Redirection si non authentifié
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/Login');
        }
    }, [authLoading, isAuthenticated, navigate]);

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            const fetchData = async () => {
                try {
                    const [postsData, typesData] = await Promise.all([
                        getAllPosts(),
                        getAllTypes()
                    ]);
                    const postsArray = Array.isArray(postsData) ? postsData : [];
                    setPosts(postsArray);
                    setTypes(typesData);
                    setLoading(false);
                } catch (err) {
                    console.error('Erreur lors du chargement des posts/types:', err);
                    setError('Une erreur est survenue lors du chargement des posts ou des types');
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [authLoading, isAuthenticated]);

    if (loading || authLoading) {
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

            {/* Filtres */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-4 justify-center space-y-4 md:space-y-0">
                {/* Filtre par type */}
                <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Tous les types</option>
                    {types.map(type => (
                        <option key={type.id} value={type.libelle}>{type.libelle}</option>
                    ))}
                </select>
                {/* Filtre par date unique */}
                <input
                    type="date"
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Date"
                />
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-8 text-gray-500 ">
                    Aucune actualité disponible pour le moment
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CreatePostCard onClick={() => navigate('/create-post')} />
                    {posts
                        .filter(post => {
                            // Filtre par type
                            if (selectedType && post.type !== selectedType) return false;
                            // Filtre par date : dateDebut >= filterDate
                            if (filterDate) {
                                const postDate = new Date(post.dateDebut).toISOString().slice(0,10);
                                if (postDate < filterDate) return false;
                            }
                            return true;
                        })
                        .map(post => (
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