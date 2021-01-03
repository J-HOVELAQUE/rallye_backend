const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const UserModel = require('../src/db/models/user');

const app = buildApp();

describe('sign-up', () => {

    beforeEach(async () => {
        await createConnection();
        await UserModel.deleteMany()
    });

    afterEach(async () => {
        await UserModel.deleteMany()
        await mongoose.connection.close();
    });

    ////////////////////////////////////////////////////////////////////
    test('POST /user/sign-up valid', async () => {

        const payload = {
            firstname: 'toto',
            name: "L'Asticot",
            email: 'toto@gmail.com',
            password: 'maiden',
        };

        const response = await supertest(app)
            .post('/user/sign-up')
            .send(payload)

        //// test the return of backend
        expect(response.body).toStrictEqual({
            "data": {
                "favorite": [],
                "firstname": "toto",
                "email": 'toto@gmail.com',
                "name": "L'Asticot",
                "status": "fan",
                "token": expect.any(String),
            },
            "error": [],
            "recorded": true,
        });
        expect(response.status).toStrictEqual(200);

        //// test the content of db
        const userFromDb = await UserModel.find();

        expect(userFromDb.length).toStrictEqual(1);
        expect(userFromDb[0]._id).toStrictEqual(expect.any(Object));
        expect(userFromDb[0].name).toStrictEqual("L'Asticot");
        expect(userFromDb[0].firstname).toStrictEqual("toto");
        expect(userFromDb[0].email).toStrictEqual("toto@gmail.com");
        expect(userFromDb[0].token).toStrictEqual(expect.any(String));
        expect(userFromDb[0].password).toStrictEqual(expect.any(String));
        expect(userFromDb[0].salt).toStrictEqual(expect.any(String));
        expect(userFromDb[0].favorite).toStrictEqual(expect.any(Array));
    });

    ////////////////////////////////////////////////////////////////////
    test('POST /user/sign-up invalid payload (password)', async () => {

        const payload = {
            firstname: 'toto',
            name: "L'Asticot",
            email: 'toto@gmail.com',
            password: 'm',
        };

        const response = await supertest(app)
            .post('/user/sign-up')
            .send(payload)

        expect(response.body).toStrictEqual({
            "error": [
                "\"password\" length must be at least 3 characters long",
            ],
            "recorded": false,
            "type": "invalid payload"
        })
        expect(response.status).toStrictEqual(400);
        const userFromDb = await UserModel.find();
        expect(userFromDb.length).toStrictEqual(0);
    });

    ////////////////////////////////////////////////////////////////////
    test('POST /user/sign-up invalid payload (password + name + email)', async () => {

        const payload = {
            firstname: 'toto',
            name: "",
            email: 'dfgx',
            password: 'm',
        };

        const response = await supertest(app)
            .post('/user/sign-up')
            .send(payload)

        expect(response.body).toStrictEqual({
            "error": [
                "\"name\" is not allowed to be empty",
                "\"password\" length must be at least 3 characters long",
                "\"email\" must be a valid email"
            ],
            "recorded": false,
            "type": "invalid payload"
        })
        expect(response.status).toStrictEqual(400);
        const userFromDb = await UserModel.find();
        expect(userFromDb.length).toStrictEqual(0);
    })

    ////////////////////////////////////////////////////////////////////
    test('POST /user/sign-up invalid payload (existing email)', async () => {

        const existingEmail = {
            firstname: 'jean',
            name: "Bon",
            email: 'toto@gmail.com',
            password: 'password'
        };

        await supertest(app)
            .post('/user/sign-up')
            .send(existingEmail)

        const payload = {
            firstname: 'toto',
            name: "L'Asticot",
            email: 'toto@gmail.com',
            password: 'maiden'
        };

        const response = await supertest(app)
            .post('/user/sign-up')
            .send(payload)

        expect(response.body).toStrictEqual({
            "error": [
                "email existant",
            ],
            "recorded": false,
            "type": "conflict",
        })
        expect(response.status).toStrictEqual(409);
        const userFromDb = await UserModel.find();
        expect(userFromDb.length).toStrictEqual(1);
    })
});