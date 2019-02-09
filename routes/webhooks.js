import express from 'express';
import * as webhooksController from './../controllers/webhooksController';
const router = express.Router();
const longpoll = require('express-longpoll')(router, { DEBUG: true });

router.post('/ep', (req, res, next) => {
    webhooksController.webhook(req, res, next, longpoll);
});

export default router;