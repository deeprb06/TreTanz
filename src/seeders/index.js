const seedService = require('../services/seeder');

async function initSeed() {
    try {
        await seedService.seedRoles();
        await seedService.seedAdmin();
    } catch (error) {
        handleError(error, 'Error in initSeed function');
    }
}

module.exports = initSeed