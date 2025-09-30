import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getPostById } from '../services/PostServices';
import { getCurrentUserId } from '../utils/auth';

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUserId = getCurrentUserId();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors du chargement du post:', err);
                setError('Une erreur est survenue lors du chargement du post');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const formatDate = (date) => {
        return format(new Date(date), 'dd MMMM yyyy HH:mm', { locale: fr });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error || 'Post non trouvé'}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {post.image && (
                    <div 
                        className="h-64 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(http://localhost:5000${post.image})` }}
                    />
                )}
                
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className={`inline-block ${
                                post.type === 'event' ? 'bg-blue-600' : 'bg-green-600'
                            } rounded-full px-3 py-1 text-sm font-semibold text-white mb-2`}>
                                {post.type}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900">{post.lieu}</h1>
                        </div>
                        
                        {currentUserId === post.userId && (
                            <button
                                onClick={() => navigate(`/edit-post/${post.id}`)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                Modifier
                            </button>
                        )}
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-700 text-lg">{post.libelle}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-600">Date de début</h3>
                                <p className="mt-1">{formatDate(post.dateDebut)}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-600">Date de fin</h3>
                                <p className="mt-1">{formatDate(post.dateFin)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-600">Créé par</h3>
                        <p className="mt-1">{post.nom} {post.prenom}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate('/')}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    ← Retour à la liste
                </button>
            </div>
        </div>
    );
};

export default PostDetails;