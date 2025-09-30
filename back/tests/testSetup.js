import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config({ path: '.env.test' });

// Configuration de la base de données de test
export const testDb = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'roombooker_test'
});

// Helper pour nettoyer la base de données de test
export const clearTestDb = async () => {
    await testDb.query('DELETE FROM posts');
    await testDb.query('DELETE FROM users');
    await testDb.query('DELETE FROM types');
    await testDb.query('DELETE FROM role');
};

// Données de test
export const testUser = {
    nom: 'Test',
    prenom: 'User',
    email: 'test@test.com',
    password: 'password123',
    roleId: 1
};

export const testType = {
    libelle: 'Test Type'
};

export const testPost = {
    typeId: 1,
    dateDebut: '2025-10-01T10:00:00',
    dateFin: '2025-10-01T11:00:00',
    lieu: 'Test Location',
    description: 'Test Description'
};