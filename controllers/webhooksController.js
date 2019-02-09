import Payment from '../models/payment';

export const webhook = async (req, res, next, longpoll) => {
    const EP_response = req.body;
    if (!EP_response.order_reference) {

        const err = new Error('Wrong webhook body.')
        err.status = 400;
        console.log(err);

        res.status = 400;
        res.json(err);

    } else {

        let HMAC_check = true; // Make hmac check here
        if (HMAC_check) {

            const payment_info = {
                status: EP_response.payment_state,
                webhookInfo: EP_response
            };

            Payment.findByIdAndUpdate(
                EP_response.order_reference,
                {
                    $set: payment_info
                }, 
                {
                    new: true
                },
                (err, updatedPayment) => {

                    if (err) {
                        console.log(err);
                        res.status = 500;
                        res.end(err);
                    }
                    longpoll.publish(`/payments/${updatedPayment._id}`, updatedPayment);
                    res.end('OK');

                }
            );
        }
    }
}
