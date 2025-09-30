import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../services/PostServices';
import { getCurrentUserId } from '../utils/auth';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUserId = getCurrentUserId();
    
    const [formData, setFormData] = useState({
        lieu: '',
        type: 'event',
        description: '',
        libelle: '',
        dateDebut: '',
        dateFin: '',
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPostById(id);
                
                // Vérifier si l'utilisateur est autorisé à modifier ce post
                if (post.userId !== currentUserId) {
                    setError("Vous n'êtes pas autorisé à modifier ce post");
                    setLoading(false);
                    return;
                }

                // Formater les dates pour l'input datetime-local
                const formatDateForInput = (dateString) => {
                    const date = new Date(dateString);
                    return date.toISOString().slice(0, 16);
                };

                setFormData({
                    lieu: post.lieu,
                    type: post.type,
                    libelle: post.libelle,
                    description: post.description,
                    dateDebut: formatDateForInput(post.dateDebut),
                    dateFin: formatDateForInput(post.dateFin),
                });
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors du chargement du post:', err);
                setError('Une erreur est survenue lors du chargement du post');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, currentUserId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost(id, formData);
            navigate(`/posts/${id}`);
        } catch (err) {
            console.error('Erreur lors de la mise à jour:', err);
            setError('Une erreur est survenue lors de la mise à jour du post');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le post</h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="libelle" className="block text-sm font-medium text-gray-700">
                            Titre
                        </label>
                        <input
                            type="text"
                            id="libelle"
                            name="libelle"
                            value={formData.libelle}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="lieu" className="block text-sm font-medium text-gray-700">
                            Lieu
                        </label>
                        <input
                            type="text"
                            id="lieu"
                            name="lieu"
                            value={formData.lieu}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="event">Événement</option>
                            <option value="bon plan">Bon plan</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                                Date de début
                            </label>
                            <input
                                type="datetime-local"
                                id="dateDebut"
                                name="dateDebut"
                                value={formData.dateDebut}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                                Date de fin
                            </label>
                            <input
                                type="datetime-local"
                                id="dateFin"
                                name="dateFin"
                                value={formData.dateFin}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate(`/posts/${id}`)}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;