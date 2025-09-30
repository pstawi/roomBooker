import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/PostServices';
import { getAllTypes } from '../services/TypeServices';

const CreatePost = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [types, setTypes] = useState([]);
    
    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const typesData = await getAllTypes();
                setTypes(typesData);
                if (typesData.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        typeId: typesData[0].id
                    }));
                }
            } catch (err) {
                console.error('Erreur lors du chargement des types:', err);
                setError('Erreur lors du chargement des types de post');
            }
        };
        fetchTypes();
    }, []);
    
    const [formData, setFormData] = useState({
        lieu: '',
        typeId: '',
        libelle: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({
                ...prev,
                image: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            for (const [key, value] of Object.entries(formData)) {
                if (key === 'image' && value) {
                    formDataToSend.append('image', value); // value doit être un File
                } else if (value !== null && value !== undefined) {
                    formDataToSend.append(key, value);
                }
            }
            // Debug : afficher le contenu du FormData
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0]+ ':', pair[1]);
            }

            await createPost(formDataToSend);
            navigate('/');
        } catch (err) {
            console.error('Erreur lors de la création:', err);
            setError('Une erreur est survenue lors de la création du post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Créer un nouveau post</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="libelle" className="block text-sm font-medium text-gray-700">
                            Libellé
                        </label>
                        <input
                            type="text"
                            id="libelle"
                            name="libelle"
                            value={formData.libelle}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Libellé du post"
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
                            placeholder="Nom du lieu"
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
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            {types.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.libelle}
                                </option>
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
                            placeholder="Description détaillée"
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

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image (optionnelle)
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                    </div>

                    <div className="flex items-center justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Création...' : 'Créer le post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;