// Lance l'applis
const config = require('config');

const buildApp = require('./src/app');
const createConnection = require('./src/db/connection');

const environement = config.get('environement');
console.log('ENVIRONEMENT', environement);

async function run() {
    await createConnection();
    const PORT = config.get('app.port');
    const app = buildApp();

    app.listen(PORT, () => {
        console.log('SERVER STARTED ON:', PORT);
    });
}

run().catch((err) => { console.log('Error on start', err); });