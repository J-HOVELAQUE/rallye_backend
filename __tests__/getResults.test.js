const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const ResultModel = require('../src/db/models/result');
const TeamModel = require('../src/db/models/team');
const UserModel = require('../src/db/models/user');
const CarModel = require('../src/db/models/car');

const app = buildApp();

describe('results', () => {

    beforeEach(async () => {
        await createConnection();
        await ResultModel.deleteMany();
        await TeamModel.deleteMany();
        await UserModel.deleteMany();
        await CarModel.deleteMany();

        //// Preparing database for test ////
        const existingPilots = [
            {
                firstname: "Jean",
                name: "Dupont",
                email: "dup@gmail.com",
                password: "maiden",
                status: "pilot",
                nationality: "fra"
            },
            {
                firstname: "Rene",
                name: "Dupre",
                email: "ren@gmail.com",
                password: "maiden",
                status: "pilot",
                nationality: "fra"
            }
        ]

        const recordedPilot1 = await supertest(app)
            .post('/admin/user')
            .send(existingPilots[0]);

        const recordedPilot2 = await supertest(app)
            .post('/admin/user')
            .send(existingPilots[1]);

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

        const existingResult = {
            team_id: recordedTeam.body.data._id,
            stage: "ES1",
            position: 1,
            gpe_position: 1,
            time: "01:45:19",
            diff: "00:00:00"
        }

        await supertest(app)
            .post('/admin/results')
            .send(existingResult);

    })

    afterEach(async () => {

        //// Purging database ////
        await ResultModel.deleteMany();
        await TeamModel.deleteMany();
        await UserModel.deleteMany();
        await CarModel.deleteMany();
        await mongoose.connection.close();
    });

    ////////////////////////////////////////////////////////
    test('POST /results/results valid', async () => {

        const response = await supertest(app)
            .get('/results/results')

        expect(response.body).toStrictEqual({
            "results": [
                {
                    "__v": 0,
                    "_id": expect.any(String),
                    "diff": "00:00:00",
                    "gpe_position": 1,
                    "position": 1,
                    "stage": "ES1",
                    "team_id": {
                        "__v": 0,
                        "_id": expect.any(String),
                        "car": expect.any(String),
                        "car_id": 104,
                        "category": "Basse",
                        "grid": 1,
                    },
                    "time": "01:45:19",
                },
            ],
        });
        expect(response.status).toStrictEqual(200);
    })
})