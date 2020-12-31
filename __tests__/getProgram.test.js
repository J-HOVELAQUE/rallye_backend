const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const ProgramModel = require('../src/db/models/program');

const app = buildApp();

describe('program', () => {
    // This will be runned before all tests.
    beforeEach(async () => {
        await createConnection();
        await ProgramModel.deleteMany();

        const existingNews = [
            {
                date: new Date(97, 12, 25, 1, 0, 0),
                "event": [
                    "VERS-PONT-DU-GARD (D981 / D19)",
                    "CASTILLON-DU-GARD (D19 / D19AX / D6086)",
                    "REMOULINS (D6086 / D6101 / D6100)"
                ]
            },
            {
                date: new Date(97, 12, 25, 1, 0, 0),
                event: [
                    "FOURNES (D6100)",
                    "ROQUEMAURE "
                ]
            }
        ];

        existingNews.forEach(async (news) => {
            const newNews = new ProgramModel(news);
            await newNews.save();
        });
    })

    afterEach(async () => {
        await ProgramModel.deleteMany();
        await mongoose.connection.close();
    });

    ////////////////////////////////////////////////////////
    test('POST /program/get-program valid', async () => {

        const response = await supertest(app)
            .get('/program/get-program')

        console.log('>>>>>>>>>>>>>>>>PROGRAM', typeof response.body.program[0].date);

        expect(response.body).toStrictEqual({
            "program": [
                {
                    "__v": 0,
                    "_id": expect.any(String),
                    "date": "1998-01-25T00:00:00.000Z",
                    "event": [
                        "VERS-PONT-DU-GARD (D981 / D19)",
                        "CASTILLON-DU-GARD (D19 / D19AX / D6086)",
                        "REMOULINS (D6086 / D6101 / D6100)"
                    ]
                },
                {
                    "__v": 0,
                    "_id": expect.any(String),
                    "date": "1998-01-25T00:00:00.000Z",
                    "event": [
                        "FOURNES (D6100)",
                        "ROQUEMAURE ",
                    ]
                },
            ],
        })
        expect(response.status).toStrictEqual(200);
    })
})