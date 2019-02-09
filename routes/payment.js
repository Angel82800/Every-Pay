import express from 'express';
import * as PaymentController from './../controllers/paymentController';
const router = express.Router();
const longpoll = require('express-longpoll')(router, { DEBUG: true });


router.post('/:userId/payments', (req, res, next) => {
    PaymentController.payment(req, res, next, longpoll);
});

export default router;
