const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const TeamModel = require('../src/db/models/team');
const UserModel = require('../src/db/models/user');
const CarModel = require('../src/db/models/car');
const app = buildApp();

describe('favorites', () => {

    let token = null;
    let teamId = null;

    beforeEach(async () => {
        await createConnection();
        await TeamModel.deleteMany();
        await UserModel.deleteMany();
        await CarModel.deleteMany();

        ///// Prepare the database ////
        const existingUsers = [
            {
                firstname: "Jean",
                name: "Dupont",
                email: "dup@gmail.com",
                password: "maiden",
                status: "pilot",
                nationality: "fra",
                favorite: []
            },
            {
                firstname: "Rene",
                name: "Dupre",
                email: "ren@gmail.com",
                password: "maiden",
                status: "pilot",
                nationality: "fra",
                favorite: []
            }
        ]

        const recordedPilot1 = await supertest(app)
            .post('/admin/user')
            .send(existingUsers[0]);

        token = recordedPilot1.body.data.token;

        const recordedPilot2 = await supertest(app)
            .post('/admin/user')
            .send(existingUsers[1]);

        const existingCar = {
            brand: 'FERRARI',
            model: '308 Gr IV Michelotto',
            year: 1981,
            image: 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1607604492/253_rahrtt.jpg',
        }

        const recordedCar = await supertest(app)
            .post('/admin/car')
            .send(existingCar);

        const existingTeam = {
            pilot_1: recordedPilot1.body._id,
            pilot_2: recordedPilot2.body._id,
            car_id: 104,
            car: recordedCar.body.data._id,
            category: "Basse",
            grid: 1
        }

        const recordedTeam = await supertest(app)
            .post('/admin/team')
            .send(existingTeam);

        teamId = recordedTeam.body.data._id;
    })

    afterEach(async () => {

        //// Purge database ////
        await TeamModel.deleteMany();
        await UserModel.deleteMany();
        await CarModel.deleteMany();
        await mongoose.connection.close();
    });

    test('POST /user/add-favorite valid', async () => {

        //// Adding a favorite ////
        const payload = {
            token: token,
            newValue: teamId
        }

        const response = await supertest(app)
            .put('/user/add-favorite')
            .send(payload);

        expect(response.body).toStrictEqual({ "result": true });
        expect(response.status).toStrictEqual(200);

        //// Checking database ////
        let userFromDb = await UserModel.findOne({ token: token });

        expect(userFromDb.favorite.length).toStrictEqual(1);
        expect(userFromDb.favorite[0].toString()).toStrictEqual(teamId.toString());

        //// Remove favorite ////
        const payload2 = {
            token: token,
            valueToRemove: teamId
        }

        const response2 = await supertest(app)
            .put('/user/remove-favorite')
            .send(payload2);

        expect(response2.body).toStrictEqual({ "result": true });
        expect(response2.status).toStrictEqual(200);

        //// Checking database ////
        userFromDb = await UserModel.findOne({ token: token });

        expect(userFromDb.favorite.length).toStrictEqual(0);

    })
})