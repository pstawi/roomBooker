import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../services/PostServices';
import { getCurrentUserId } from '../utils/auth';
import { getAllTypes } from '../services/TypeServices';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUserId = getCurrentUserId();
    const [types, setTypes] = useState([]);
    const [formData, setFormData] = useState({
        lieu: '',
        typeId: '',
        description: '',
        libelle: '',
        dateDebut: '',
        dateFin: '',
    });

    useEffect(() => {
        const fetchTypesAndPost = async () => {
            try {
                const typesData = await getAllTypes();
                setTypes(typesData);
                const post = await getPostById(id);
                if (post.userId !== currentUserId) {
                    setError("Vous n'êtes pas autorisé à modifier ce post");
                    setLoading(false);
                    return;
                }
                // Trouver le typeId correspondant au type (libellé)
                const foundType = typesData.find(t => t.libelle === post.type);
                const typeId = foundType ? foundType.id : '';
                // Formater les dates pour l'input datetime-local
                const formatDateForInput = (dateString) => {
                    const date = new Date(dateString);
                    return date.toISOString().slice(0, 16);
                };

                setFormData({
                    lieu: post.lieu,
                    typeId: typeId,
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

        fetchTypesAndPost();
    }, [id, currentUserId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const formDataToSend = new FormData();
            for (const [key, value] of Object.entries(formData)) {
                if (key === 'image' && value) {
                    formDataToSend.append('image', value); // value doit être un File si modifié
                } else if (value !== null && value !== undefined) {
                    formDataToSend.append(key, value);
                }
            }
            // Debug : afficher le contenu du FormData
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0]+ ':', pair[1]);
            }
            await updatePost(id, formDataToSend);
            navigate(`/posts/${id}`);
        } catch (err) {
            console.error('Erreur lors de la mise à jour:', err);
            setError('Une erreur est survenue lors de la mise à jour du post');
        } finally {
            setLoading(false);
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
                        <label htmlFor="typeId" className="block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select
                            id="typeId"
                            name="typeId"
                            value={formData.typeId}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            {types.map(type => (
                                <option key={type.id} value={type.id}>{type.libelle}</option>
                            ))}
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
                            className="bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
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