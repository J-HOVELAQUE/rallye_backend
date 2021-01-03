const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const UserModel = require('../src/db/models/user');

const app = buildApp();

describe('sign-in', () => {

    beforeEach(async () => {
        await createConnection();
        await UserModel.deleteMany();

        //// Prepare database for test ////
        const existingEmail = {
            firstname: 'jean',
            name: "Bon",
            email: 'toto@gmail.com',
            password: 'maiden'
        };

        await supertest(app)
            .post('/user/sign-up')
            .send(existingEmail);
    })

    afterEach(async () => {

        //// Purging database ////
        await UserModel.deleteMany();
        await mongoose.connection.close();
    });

    ////////////////////////////////////////////////////////
    test('POST /user/sign-in valid', async () => {

        const payload = {
            email: 'toto@gmail.com',
            password: 'maiden'
        }

        const response = await supertest(app)
            .post('/user/sign-in')
            .send(payload);

        expect(response.body).toStrictEqual({
            "data": {
                "firstname": "jean",
                "email": "toto@gmail.com",
                "name": "Bon",
                "status": "fan",
                "token": expect.any(String),
            },
            "error": [],
            "favorites": expect.any(Array),
            "result": true,
        })
        expect(response.status).toStrictEqual(200);
    })

    ////////////////////////////////////////////////////////
    test('POST /user/sign-in invalid(wrong password)', async () => {

        const payload = {
            email: 'toto@gmail.com',
            password: 'maidend'
        }

        const response = await supertest(app)
            .post('/user/sign-in')
            .send(payload);

        expect(response.body).toStrictEqual({
            "data": {
                "status": null,
                "token": null,
            },
            "error": [
                "wrong password",
            ],
            "favorites": [],
            "result": false,
        })
        expect(response.status).toStrictEqual(400);
    })

    ////////////////////////////////////////////////////////
    test('POST /user/sign-in invalid(inexisting email)', async () => {

        const payload = {
            email: 'tata@gmail.com',
            password: 'maiden'
        }

        const response = await supertest(app)
            .post('/user/sign-in')
            .send(payload);

        expect(response.body).toStrictEqual({
            "data": {
                "status": null,
                "token": null,
            },
            "error": [
                "inexisting email",
            ],
            "favorites": [],
            "result": false,
        })
        expect(response.status).toStrictEqual(400);
    })

    ////////////////////////////////////////////////////////
    test('POST /user/sign-in invalid(invalid payload)', async () => {

        const payload = {
            email: '',
            password: ''
        }

        const response = await supertest(app)
            .post('/user/sign-in')
            .send(payload);

        expect(response.body).toStrictEqual({
            "data": {
                "status": null,
                "token": null,
            },
            "error": [
                "\"password\" is not allowed to be empty",
                "\"email\" is not allowed to be empty",
            ],
            "favorites": [],
            "result": false,
        })
        expect(response.status).toStrictEqual(400);
    })
})