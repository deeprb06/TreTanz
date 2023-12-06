const Role = require('../models/role');
const User = require('../models/user');

const seedRoles = async () => {
    try {
        const rolesJSON = require('../seeders/role.json');
        const findRoles = await Role.find({});
        for (const data of rolesJSON) {
            const existingRoles = findRoles.find((element) => element.code === data.code)
            if (!existingRoles) {
                await Role.create(data);
            }
        }

        logger.info('Roles seeded successfully! 👨‍⚕️👨‍🔧👨‍🚀');
    } catch (error) {
        logger.error('Error in seedRoles', error);
    }
};

const seedAdmin = async () => {
    try {
        const adminJSON = require('../seeders/admin.json');

        const findAdmin = await User.find({});
        for (const data of adminJSON) {
            const existingAdmins = findAdmin.find((element) => element.email === data.email)
            if (!existingAdmins) {
                const findRole = await Role.findOne({ code: data.role }, { _id: 1, code: 1 });
                data.roleId = findRole._id
                await User.create(data);
            }
        }
        logger.info('Admin seeded successfully! 👦👩');

    } catch (error) {
        logger.error('Error in seedAdmin', error);
    }
}





module.exports = {
    seedRoles,
    seedAdmin
}