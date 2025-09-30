import request from 'supertest';
import bcrypt from 'bcrypt';
import { app } from '../index.js';
import { testDb, clearTestDb, testUser } from './testSetup.js';

describe('Auth Routes', () => {
    beforeAll(async () => {
        await clearTestDb();
        // Créer un rôle pour les tests
        await testDb.query('INSERT INTO role (id, libelle) VALUES (1, "user")');
    });

    afterAll(async () => {
        await clearTestDb();
        await testDb.end();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Utilisateur créé');
            expect(response.body.user).toHaveProperty('id');
        });

        it('should not register a user with existing email', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeAll(async () => {
            // Créer un utilisateur pour les tests de connexion
            const hashedPassword = await bcrypt.hash(testUser.password, 10);
            await testDb.query(
                'INSERT INTO users (nom, prenom, email, password, roleId) VALUES (?, ?, ?, ?, ?)',
                [testUser.nom, testUser.prenom, testUser.email, hashedPassword, testUser.roleId]
            );
        });

        it('should login with valid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should not login with invalid password', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Mot de passe incorrect');
        });
    });
});