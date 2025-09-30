import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { authenticate, register } from '../services/AuthServices';


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const response = await authenticate(credentials);

            console.log(response);
            login(response.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Une erreur est survenue lors de la connexion');
        }
    };

    const handleRegister = async (userData) => {
        if (userData.password !== userData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            await register(userData);

            // Basculer vers le formulaire de connexion après l'inscription
            setIsLogin(true);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Une erreur est survenue lors de l\'inscription');
        }
    };

    return (
        <div className="flex-grow py-12 ">
            <div className="max-w-md mx-auto space-y-8 p-8 bg-white rounded-lg shadow-md">
                {/* En-tête avec les boutons de switch */}
                <div className="flex justify-center space-x-4 border-b border-gray-200">
                    <button
                        className={`pb-2 px-4 text-sm font-medium ${
                            isLogin
                                ? 'border-b-2 border-indigo-500 text-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => {
                            setIsLogin(true);
                            setError('');
                        }}
                    >
                        Connexion
                    </button>
                    <button
                        className={`pb-2 px-4 text-sm font-medium ${
                            !isLogin
                                ? 'border-b-2 border-indigo-500 text-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => {
                            setIsLogin(false);
                            setError('');
                        }}
                    >
                        Inscription
                    </button>
                </div>

                {/* Message d'erreur */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Formulaire */}
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Connexion à votre compte' : 'Créer un compte'}
                    </h2>
                    <div className="mt-8">
                        {isLogin ? (
                            <LoginForm onLogin={handleLogin} />
                        ) : (
                            <RegisterForm onRegister={handleRegister} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;