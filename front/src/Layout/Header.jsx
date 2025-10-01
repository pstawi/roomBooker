import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import Logo from '../assets/Logo.png';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-indigo-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <img src={Logo} alt="Logo" className="h-8 mr-2" />
                        <Link to="/" className="text-white font-bold text-xl">
                            
                        
                            Good Dealz
                        </Link>
                    </div>

                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/login" 
                                className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Connexion / Inscription
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;