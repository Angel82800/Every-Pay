import mongoose, { Schema } from 'mongoose';


const PaymentSchema = new Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Users',
    //     required: true
    // },
    userId: {
        type: String,
        required: true
    },
    // walletId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Wallets',
    //     default: ''
    // },
    walletId: {
        type: String,
        default: ''
    },
    // paymentFiatCurrency: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'FiatCurrencies', // ("eur" | "usd" | ...)
    //     required: true
    // },
    paymentFiatCurrency: {
        type: String,
        required: true
    },
    fiatAmount: {
        type: Number,
        required: true
    },
    // destinationCrypto: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'CryptoCurrencies', // "BTC" | "BCH" | "ETH"
    //     required: true
    // },
    destinationCrypto: {
        type: String,
        required: true
    },
    cryptoAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String, // 'new', 'completed', 'cancelled', 'failed'
        default: 'new'
    },
    // paymentMethod: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'PaymentMethods', // "skrill" | "everypay"
    //     required: true
    // },
    paymentMethod: {
        type: String,  // "skrill" | "everypay"
        required: true
    },
    exchangeTx: {
        type: String,
        required: true
    },
    webhookInfo: {
        type: mongoose.Schema.Types.Mixed
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model('Payment', PaymentSchema);
