const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const TeamModel = require('../src/db/models/team');
const UserModel = require('../src/db/models/user');
const CarModel = require('../src/db/models/car');

const app = buildApp();

describe('results', () => {
    // This will be runned before all tests.
    beforeEach(async () => {
        await createConnection();
        await TeamModel.deleteMany();
        await UserModel.deleteMany();
        await CarModel.deleteMany();


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

        await supertest(app)
            .post('/admin/team')
            .send(existingTeam);


    })

    afterEach(async () => {
        await TeamModel.deleteMany();
        await UserModel.deleteMany();
        await CarModel.deleteMany();
        await mongoose.connection.close();
    });

    test('POST /teams/get-teams valid', async () => {

        const response = await supertest(app)
            .get('/teams/get-teams')

        expect(response.body).toStrictEqual({

            "teams": [
                {
                    "__v": 0,
                    "_id": expect.any(String),
                    "car": {
                        "__v": 0,
                        "_id": expect.any(String),
                        "brand": "FERRARI",
                        "image": "https://res.cloudinary.com/dibl3ihpy/image/upload/v1607604492/253_rahrtt.jpg",
                        "model": "308 Gr IV Michelotto",
                        "year": 1981,
                    },
                    "car_id": 104,
                    "category": "Basse",
                    "grid": 1,
                },
            ],
        });
        // expect(response.status).toStrictEqual(200);


    })
})