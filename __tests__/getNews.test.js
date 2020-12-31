const supertest = require("supertest");
const mongoose = require('mongoose');

const buildApp = require('../src/app');
const createConnection = require('../src/db/connection');
const NewsModel = require('../src/db/models/news');

const app = buildApp();

describe('news', () => {
    // This will be runned before all tests.
    beforeEach(async () => {
        await createConnection();
        await NewsModel.deleteMany();

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

        existingNews.forEach(async (news) => {
            const newNews = new NewsModel(news);
            await newNews.save();
        });
    })

    afterEach(async () => {
        await NewsModel.deleteMany()
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