import request from 'supertest';
import { app } from '../index.js';
import { testDb, clearTestDb, testUser, testType, testPost } from './testSetup.js';
import jwt from 'jsonwebtoken';

describe('Post Routes', () => {
    let authToken;
    let userId;
    let typeId;

    beforeAll(async () => {
        await clearTestDb();
        
        // Créer un rôle
        await testDb.query('INSERT INTO role (id, libelle) VALUES (1, "user")');
        
        // Créer un utilisateur
        const [userResult] = await testDb.query(
            'INSERT INTO users (nom, prenom, email, password, roleId) VALUES (?, ?, ?, ?, ?)',
            [testUser.nom, testUser.prenom, testUser.email, 'hashedpassword', testUser.roleId]
        );
        userId = userResult.insertId;
        
        // Créer un type
        const [typeResult] = await testDb.query(
            'INSERT INTO types (libelle) VALUES (?)',
            [testType.libelle]
        );
        typeId = typeResult.insertId;
        
        // Générer un token
        authToken = jwt.sign({ id: userId, roleId: testUser.roleId }, process.env.JWT_SECRET);
    });

    afterAll(async () => {
        await clearTestDb();
        await testDb.end();
    });

    describe('POST /api/posts', () => {
        it('should create a new post', async () => {
            const response = await request(app)
                .post('/api/posts')
                .set('Authorization', `Bearer ${authToken}`)
                .field('typeId', typeId)
                .field('dateDebut', testPost.dateDebut)
                .field('dateFin', testPost.dateFin)
                .field('lieu', testPost.lieu)
                .field('description', testPost.description);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Post créé');
            expect(response.body.post).toHaveProperty('id');
        });

        it('should not create a post without authentication', async () => {
            const response = await request(app)
                .post('/api/posts')
                .send(testPost);

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/posts', () => {
        it('should get all posts', async () => {
            const response = await request(app)
                .get('/api/posts')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /api/posts/:id', () => {
        let postId;

        beforeAll(async () => {
            const [result] = await testDb.query(
                'INSERT INTO posts (typeId, userId, dateDebut, dateFin, lieu, description) VALUES (?, ?, ?, ?, ?, ?)',
                [typeId, userId, testPost.dateDebut, testPost.dateFin, testPost.lieu, testPost.description]
            );
            postId = result.insertId;
        });

        it('should get a post by id', async () => {
            const response = await request(app)
                .get(`/api/posts/${postId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', postId);
        });

        it('should return 404 for non-existent post', async () => {
            const response = await request(app)
                .get('/api/posts/99999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /api/posts/:id', () => {
        let postId;

        beforeEach(async () => {
            const [result] = await testDb.query(
                'INSERT INTO posts (typeId, userId, dateDebut, dateFin, lieu, description) VALUES (?, ?, ?, ?, ?, ?)',
                [typeId, userId, testPost.dateDebut, testPost.dateFin, testPost.lieu, testPost.description]
            );
            postId = result.insertId;
        });

        it('should update a post', async () => {
            const updatedPost = {
                ...testPost,
                lieu: 'Updated Location'
            };

            const response = await request(app)
                .put(`/api/posts/${postId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updatedPost);

            expect(response.status).toBe(200);
            expect(response.body.post.lieu).toBe('Updated Location');
        });

        it('should not update a post owned by another user', async () => {
            const otherUserId = userId + 1;
            await testDb.query(
                'INSERT INTO users (nom, prenom, email, password, roleId) VALUES (?, ?, ?, ?, ?)',
                ['Other', 'User', 'other@test.com', 'hashedpassword', testUser.roleId]
            );
            
            const otherUserToken = jwt.sign(
                { id: otherUserId, roleId: testUser.roleId },
                process.env.JWT_SECRET
            );

            const response = await request(app)
                .put(`/api/posts/${postId}`)
                .set('Authorization', `Bearer ${otherUserToken}`)
                .send(testPost);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /api/posts/:id', () => {
        let postId;

        beforeEach(async () => {
            const [result] = await testDb.query(
                'INSERT INTO posts (typeId, userId, dateDebut, dateFin, lieu, description) VALUES (?, ?, ?, ?, ?, ?)',
                [typeId, userId, testPost.dateDebut, testPost.dateFin, testPost.lieu, testPost.description]
            );
            postId = result.insertId;
        });

        it('should delete a post', async () => {
            const response = await request(app)
                .delete(`/api/posts/${postId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Post supprimé');

            // Vérifier que le post a bien été supprimé
            const [rows] = await testDb.query('SELECT * FROM posts WHERE id = ?', [postId]);
            expect(rows.length).toBe(0);
        });

        it('should not delete a post owned by another user', async () => {
            const otherUserId = userId + 1;
            const otherUserToken = jwt.sign(
                { id: otherUserId, roleId: testUser.roleId },
                process.env.JWT_SECRET
            );

            const response = await request(app)
                .delete(`/api/posts/${postId}`)
                .set('Authorization', `Bearer ${otherUserToken}`);

            expect(response.status).toBe(403);
        });
    });
});