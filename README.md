# Installation

```
npm install
npm start
```

# Test page

After start test page will be at http://localhost:3000/test-page/

Press "Create payment" - new payment will be created and you will get params for EP POST form.
And the page will be automatically subscribed to long-poll.
Press "Send Webhook" to simulate webhook from EP - you will get updated Payment object with status 'settled'.
More information in browser console.

# API

## Create Payment

```
Request:
POST /:userId/payments

'userId' will be taken from URL string. And now it's just a string in database, not ObjectId from dictonary

Request body:
Content-Type: application/json
{
  "paymentFiatCurrency": "Payment currency",    // Now it's a string in database, not ObjectId from dictonary
  "fiatAmount" : "Payment amount",    // Number
  "destinationCrypto" : "Desired Crypto"   // Now it's a string in database, not ObjectId from dictonary
}

Response:
Params witch needed for EP create payment POST redirect.
{
  api_url,   // from config
  account_id,   // paymentFiatCurrency
  amount,   // fiatAmount
  api_username,   // from config
  callback_url,   // from config
  customer_url,   // from config - it's redirect url after successful payment
  hmac_fields,
  nonce,    // long random string
  order_reference,  // it's new payment's ObjectId
  timestamp,
  transaction_type,   // now it's 'charge'
}
```

## LongPoll

```
Request:
GET /payments/:paymentId
Content-Type: application/json

Response
It's Payment object, witch updated after incoming webhook
{
  { 
    "walletId": "", 
    "status": "settled", 
    "_id": "5b9e5e248217764dd028c2f5", 
    "userId": "123", 
    "paymentFiatCurrency": "USD", 
    "fiatAmount": 100, 
    "destinationCrypto": "ETH", 
    "cryptoAmount": 123, 
    "paymentMethod": "everypay", 
    "exchangeTx": "abc", 
    "createdAt": "2018-09-16T13:44:04.128Z", 
    "updatedAt": "2018-09-16T13:44:05.214Z", "__v": 0, 
    "webhookInfo": { "order_reference": "5b9e5e248217764dd028c2f5", "payment_state": "settled" } }
}
```

## Webhooks

```
Request
POST /webhooks/eq
Content-Type: application/json
Required params:
{
  order_reference: String // it's Payment ObjectId, sent to EP as a 'order_reference' param,
  payment_state: String  // it's EP transaction states: ‘settled’, ‘authorised’, ‘cancelled’, ‘waiting_for_3ds_response’, ‘failed’
}
..and additional params will be stored in webhookInfo.

Response 200 "Got it."

```

# TO DO

1) HMAC calcualtion in 'Create Payment'.
2) HMAC check in 'Webhooks'.
3) userId, walletId, paymentFiatCurrency, destinationCrypto, paymentMethod is just a strings - must be objects from appropriate collections. POST endpoints to add new, GET endpoints to get supported currencies.
4) When create new Payment object 'cryptoAmount' must be calculated with approprate exchange rate.
5) What's exchangeTx.