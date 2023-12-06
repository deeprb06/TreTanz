
const app = require('./app');
const { SERVER } = require('./src/config/config');

app.listen(SERVER.PORT, () => {
    logger.info(`Backend server running on port ${SERVER.PORT}`);
})