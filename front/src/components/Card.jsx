import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserId } from '../utils/auth';
import { deletePost } from '../services/PostServices';

const Card = ({ post, onDelete }) => {
    const navigate = useNavigate();
    const currentUserId = getCurrentUserId();

    const formatDate = (date) => {
        return format(new Date(date), 'dd MMMM yyyy HH:mm', { locale: fr });
    };

    const getTypeColor = (type) => {
        const colors = {
            'event': 'bg-blue-600',
            'bon plan': 'bg-green-600'
        };
        return colors[type] || 'bg-indigo-800';
    };

    const handleEdit = () => {
        navigate(`/edit-post/${post.id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
            try {
                await deletePost(post.id);
                onDelete(post.id);
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression du post');
            }
        }
    };

    const cardStyle = post.image ? {
        backgroundImage: `url(http://localhost:5000${post.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    return (
        <div
            onClick={() => navigate(`/posts/${post.id}`)}
            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
            style={{ minHeight: '300px' }}
        >
            {/* Image de fond */}
            <div
                className="absolute inset-0"
                style={{ ...cardStyle, zIndex: 0 }}
            />
            {/* Overlay filtre par défaut (ex: brightness) */}
            <div
                className="absolute inset-0"
                style={{ zIndex: 1, background: 'rgba(0,0,0,0)', filter: 'brightness(0.7)' }}
            />
            {/* Overlay dégradé pour la lisibilité */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
                style={{ zIndex: 2 }}
            />
            {/* Contenu */}
            <div className="relative h-full p-6 flex flex-col justify-between" style={{ zIndex: 3 }}>
                {/* En-tête */}
                <div className="flex justify-between items-start">
                    <div>
                        <div className={`inline-block ${getTypeColor(post.type)} rounded-full px-3 py-1 text-sm font-semibold text-white mb-2`}>
                            {post.type}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            {post.lieu}
                        </h3>
                    </div>
                    {currentUserId && currentUserId === post.userId && (
                        <div className="flex space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit();
                                }}
                                className="p-1 rounded-full hover:bg-white/20 transition-colors"
                                title="Modifier"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                                className="p-1 rounded-full hover:bg-white/20 transition-colors"
                                title="Supprimer"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Corps */}
                <div className="text-white/90">
                    {post.libelle && (
                        <p className="text-sm mb-4">
                            {post.libelle.length > 150 
                                ? `${post.libelle.substring(0, 150)}...` 
                                : post.libelle}
                        </p>
                    )}
                </div>

                {/* Pied de carte */}
                <div className="mt-4">
                    <div className="flex flex-col space-y-1 text-white/80 text-sm">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Début : {formatDate(post.dateDebut)}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Fin : {formatDate(post.dateFin)}</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Par {post.nom} {post.prenom}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;