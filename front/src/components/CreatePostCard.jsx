const CreatePostCard = ({ onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600"
            style={{ minHeight: '300px' }}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="mb-4">
                        <svg 
                            className="w-16 h-16 mx-auto text-white/90" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold">Créer un nouveau post</h3>
                    <p className="mt-2 text-white/80">Cliquez pour ajouter un nouvel événement ou bon plan</p>
                </div>
            </div>
        </div>
    );
};

export default CreatePostCard;