import multer from 'multer';
import path from 'path';

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images'); // Les images seront stockées dans le dossier uploads/images
    },
    filename: (req, file, cb) => {
        // Création d'un nom de fichier unique avec timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtre pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Format de fichier non supporté. Utilisez JPEG, JPG ou PNG.'), false);
    }
};

// Configuration de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de taille : 5MB
    }
});

export default upload;