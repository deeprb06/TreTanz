const Permission = require('../models/permission');
const PermissionRole = require('../models/permissionRole');

const permit = async (req) => {
    try {
        if (!req.roleIds) {
            throw new Error('Please provide role ids in the request object');
        }

        if (req.route.hasOwnProperty('o')) {
            const permission = await Permission.findOne({
                route_name: req.route['o'],
            });

            if (permission) {
                const permissionExist = await PermissionRole.findOne({
                    permission_id: permission.id,
                    role_id: req.roleIds,
                });

                return !!permissionExist;
            }
        }

        return false;
    } catch (error) {
        handleError(error, 'Error in the permit role permission service');
    }
};


module.exports = {
    permit,
};
