import Payment from './../models/payment';
import config from '../config';
import crypto from 'crypto';

export const payment = async (req, res, next, longpoll) => {
    console.log(req.body);

    const payment = {
        userId: req.params.userId,
        paymentFiatCurrency: req.body.currency,
        fiatAmount: req.body.amount,
        destinationCrypto: req.body.crypto,
        cryptoAmount: 123, // <--- Get exchange rate here
        paymentMethod: "everypay",
        exchangeTx: 'abc' // <--- What's here
    };

    Payment.create(payment, (err, newPayment) => {

        if (err) {
            res.status(400);
            return res.json(err);
        }

        longpoll._setupListener(`/payments/${newPayment._id}`, 'longpool')
        .then(
            () => {
                const data = {
                    account_id: newPayment.paymentFiatCurrency,
                    amount: newPayment.fiatAmount,
                    api_username: config.EP.api_username,
                    callback_url: config.EP.callback_url,
                    customer_url: config.EP.redirect_url,
                    hmac_fields: 'account_id,amount,api_username,callback_url,customer_url,hmac_fields,nonce,order_reference,timestamp,transaction_type',
                    nonce: crypto.randomBytes(100).toString('hex'),
                    order_reference: newPayment._id,
                    timestamp: new Date().getTime(),
                    transaction_type: 'charge',
                };
                data.hmac = 'HMAC Calc here';
                data.api_url = config.EP.api_url;
                
                res.json(data);
            },
            err => {
                res.status(500);
                return res.json(err);
            }
        );
    });
}

