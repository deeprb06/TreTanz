const express = require('express');
require('dotenv').config();
const path = require('path');
const config = require('./src/config/config');
const { localize, handleError, toTitleCase } = require('./src/utils/helper');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const FilesystemBackend = require('i18next-fs-backend');
const initSeed = require('./src/seeders');
const { store } = require('./src/seeders/store-routes');
const descriptor = require('express-list-endpoints-descriptor')(express);
const { authentication, checkPermission } = require('./src/middleware/authentication');

const app = express();

global.logger = require('./src/utils/logger');
global.catchAsync = require('./src/utils/catchAsync');
global.handleError = handleError;
global._localize = localize;
global._toTitleCase = toTitleCase;
global.authentication = authentication;
global.checkPermission = checkPermission;
global.validate = require('./src/middleware/validate');
global.util = require('./src/utils/messages');

i18next
    .use(FilesystemBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        lng: 'en',
        ns: ['auth', 'file', 'common',],
        defaultNS: ['auth', 'file', 'common',],
        backend: {
            loadPath: path.join(
                __dirname,
                `/resources/lang/{{lng}}/{{ns}}.json`,
            ),
            addPath: path.join(
                __dirname,
                `/resources/lang/{{lng}}/{{ns}}.json`,
            ),
        },
        debug: false,
        detection: {
            order: ['header', 'querystring' /*, "cookie"*/],
            lookupHeader: 'lng',
            caches: ['cookie'],
        },
        jsonIndent: 2,
        fallbackLng: 'en',
        preload: ['en', 'ro'],
    });

app.use(i18nextMiddleware.handle(i18next));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.use('/', require('./src/routes'));

if (parseInt(config.SEED)) {
    initSeed().then(() => {
        logger.info('seeded successfully')
        store(descriptor.listEndpoints(app))
    });
}

module.exports = app;
