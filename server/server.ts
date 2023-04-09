require('dotenv').config({ path: './.env' })

import express, { } from 'express';
const app = express()
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import prisma from './prisma/Prisma';

if (process.env.NODE_ENV === 'dev') {
    app.use(
        cors({
            origin: [`http://localhost:3000`],
            methods: ['GET', 'POST', 'PUT', 'PATH', 'DELETE'],
            credentials: true
        })
    )
} else if (process.env.NODE_ENV === 'prod') {
    app.use(cors());
} else {
    app.use(cors());
}

process.on('uncaughtException', function (err) {
    console.error('Un handled exception: ' + err)
});

async function main() {
    app.use(cookieParser())
    app.use(bodyParser.json());
    app.use(express.json({ limit: '500mb' }))
    app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }))

    app.use('/api/v1/', require('./routes/router'));

    await prisma.$connect().then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server listening on ${process.env.PORT || 5000}`)
        })
    })
        .catch((err: Error) => {
            console.error("Error during starting: " + err)
        })
}

main();