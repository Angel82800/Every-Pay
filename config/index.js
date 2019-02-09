const config = {
    database: 'mongodb://localhost:27017/everypay',
    port: 3000,
    secret: 'secret',
    EP: {
        api_url: '​https://igw-demo.every-pay.com/transactions/',
        api_username: 'EP_API_USERNAME',
        callback_url: 'https://api.coinmetro.com/webhooks/eq',
        redirect_url: 'https://api.coinmetro.com/redirectHere'
    }
    
};

export default config;
