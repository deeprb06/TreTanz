let dbPort;
if (process.env.DB_PORT == '') {
    dbPort = process.env.DB_PORT;
} else if (process.env.DB_PORT) {
    dbPort = `:${process.env.DB_PORT}`;
} else {
    dbPort = ':27017';
}

module.exports = {
    SERVER: {
        PORT: process.env.PORT || 3000,
    },
    MONGODB: {
        DB_CONNECTION: process.env.DB_CONNECTION ?? 'mongodb',
        DB_HOST: process.env.DB_HOST ?? 'localhost',
        DB_PORT: dbPort,
        DB_DATABASE: process.env.DB_DATABASE ?? 'TreTanz',
        DB_USERNAME: process.env.DB_USERNAME
            ? `${process.env.DB_USERNAME}:`
            : '',
        DB_PASSWORD: process.env.DB_PASSWORD
            ? `${process.env.DB_PASSWORD}@`
            : '',
    },
    URL: {
        FRONT_URL: process.env.FRONT_URL,
    },
    AUTH: {
        JWT_SECRET: process.env.JWT_SECRET ?? 'thisismysecret',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'thisismyrefreshtokensecret'
    },
    
    SEED: process.env.SEED ?? 0,
    TZ: process.env.TZ ?? 'Asia/Kolkata'
};
