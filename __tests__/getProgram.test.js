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

        const existingProg = [
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


        const record1 = await supertest(app)
            .post('/admin/program')
            .send(existingProg[0])

        expect(record1.body).toStrictEqual({
            "data": {
                "__v": 0,
                "_id": expect.any(String),
                "date": "1998-01-25T00:00:00.000Z",
                "event": existingProg[0].event
            },
            "recorded": true,
        });

        const record2 = await supertest(app)
            .post('/admin/program')
            .send(existingProg[1])

        expect(record2.body).toStrictEqual({
            "data": {
                "__v": 0,
                "_id": expect.any(String),
                "date": "1998-01-25T00:00:00.000Z",
                "event": existingProg[1].event
            },
            "recorded": true,
        })
    });


    afterEach(async () => {
        await ProgramModel.deleteMany();
        await mongoose.connection.close();
    });

    ////////////////////////////////////////////////////////
    test('POST /program/get-program valid', async () => {

        const response = await supertest(app)
            .get('/program/get-program')

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