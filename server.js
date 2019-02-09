import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyPareser from 'body-parser';
import bluebird from 'bluebird';
import path from 'path';

import config from './config';
import paymentRoute from './routes/payment';
import errorHandler from './middlewares/errorHandler';
import webhooks from './routes/webhooks';

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
    if (err) {
        throw err;
    }

    console.log('Mongo Connected!');
});

app.listen(config.port, err => {
    if (err) {
        throw err;
    }

    console.log(`Server listening on port ${config.port}`);
});

app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({extended: true}));
app.use(session({
    resave:true,
    saveUninitialized: true,
    secret: config.secret
}));

app.use('/test-page', express.static(path.join(__dirname, 'test-page')));

app.use(errorHandler);
app.use('/', paymentRoute);
app.use('/webhooks', webhooks);
