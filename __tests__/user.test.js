const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const UserModel = require('../src/db/models/user');

const app = buildApp();


async function clearDatabase() {
    await UserModel.deleteMany()
}


describe('App', () => {
    // This will be runned before all tests.
    beforeEach(async () => {
        await createConnection();
        await clearDatabase();
    });

    afterEach(async () => {
        await clearDatabase();
        await mongoose.connection.close();
    });

    test('POST /user/sign-up', async () => {

        const payload = {
            firstname: 'toto',
            name: "L'Asticot",
            email: 'toto@gmail.com',
            password: 'maiden',
        };

        const response = await supertest(app)
            .post('/user/sign-up')
            .send(payload)

        expect(response.body).toStrictEqual({
            "data": {
                // "__v": 0,
                "favorite": [],
                "firstname": "toto",
                "name": "L'Asticot",
                "status": "fan",
                "token": expect.any(String),
            },
            "error": [],
            "recorded": true,
        });
        expect(response.status).toStrictEqual(200);

        const userFromDb = await UserModel.find();

        console.log('>>>>>>>>ANSWER', userFromDb);
        console.log('>>>>>>>TYPE', typeof userFromDb[0]._id);


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
});

