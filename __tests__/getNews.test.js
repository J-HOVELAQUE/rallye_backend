const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const NewsModel = require('../src/db/models/news');

const app = buildApp();

describe('news', () => {
    beforeEach(async () => {
        await createConnection();
        await NewsModel.deleteMany();

        //// Preparing database for test ////
        const existingNews = [
            {
                title: "Accident",
                image: "https://url/accident",
                description: "Grave accident sur le circuit",
            },
            {
                title: "Ou voir passer le tour?",
                image: "https://url/passage",
                description: "Sur la route D404",
            },
            {
                title: "Ferrari à l'honneur",
                image: "https://url/ferrarie",
                description: "Les voitures rouges vont plus vite",
            }
        ];


        await supertest(app)
            .post('/admin/news')
            .send(existingNews[0]);

        await supertest(app)
            .post('/admin/news')
            .send(existingNews[1]);

        await supertest(app)
            .post('/admin/news')
            .send(existingNews[2])

    })

    afterEach(async () => {

        //// Purging database ////
        await NewsModel.deleteMany();
        await mongoose.connection.close();
    });

    ////////////////////////////////////////////////////////
    test('POST /news/get-news valid', async () => {

        const response = await supertest(app)
            .get('/news/get-news')

        expect(response.body).toStrictEqual({
            "news": [
                {
                    "__v": 0,
                    "_id": expect.any(String),
                    "description": "Grave accident sur le circuit",
                    "image": "https://url/accident",
                    "title": "Accident",
                },
                {
                    "__v": 0,
                    "_id": expect.any(String),
                    "description": "Sur la route D404",
                    "image": "https://url/passage",
                    "title": "Ou voir passer le tour?",
                },
                {
                    "__v": 0,
                    "_id": expect.any(String),
                    "description": "Les voitures rouges vont plus vite",
                    "image": "https://url/ferrarie",
                    "title": "Ferrari à l'honneur",
                },
            ],
        })
        expect(response.status).toStrictEqual(200);
    })
})