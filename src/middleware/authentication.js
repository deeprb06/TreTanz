const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { RESPONSE_CODE, JWT_STRING } = require('../config/constants/common');
const User = require('../models/user');
const Role = require('../models/role');
const { permit } = require('../services/rolePermission');
const { unAuthorizedRequest } = require('../utils/responseCode');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(JWT_STRING)[1];

        if (!token) {
            return res.status(RESPONSE_CODE.UNAUTHORIZED).send({ message: _localize('auth.unAuthenticated', req) });
        }

        const decoded = jwt.verify(token, config.AUTH.JWT_SECRET);

        const findUser = await User.findOne({ email: decoded.email });

        if (!findUser) {
            return res.status(RESPONSE_CODE.UNAUTHORIZED).send({ status: RESPONSE_CODE.UNAUTHORIZED, message: _localize('module.notFound', req, 'User') });
        }

        const existingRole = await Role.findOne({ _id: findUser.roleId, isActive: true });

        if (!existingRole) {
            return res.status(RESPONSE_CODE.UNAUTHORIZED).send({ message: _localize('auth.unAuthenticated', req) });
        }

        req.roleCode = existingRole.code;
        req.roleName = existingRole.name;
        req.roleIds = existingRole._id;
        req.userId = findUser.id;
        req.user = findUser;

        next();
    } catch (error) {
        return res.status(RESPONSE_CODE.UNAUTHORIZED).send({ message: _localize('auth.unAuthenticated', req) });
    }
};

async function checkPermission(req, res, next) {
    try {
        const result = await permit(req);
        if (result) {
            const user = req.user;
            if (req.method !== 'GET') {
                if (req.method === 'POST') {
                    req.body.createdBy = user._id;
                } else if (req.method === 'PUT') {
                    const softDelete = req.originalUrl.search('soft-delete');
                    if (softDelete !== -1) {
                        req.body.deletedBy = user._id;
                    }
                }
                req.body.updatedBy = user._id;
            }

            next();
        } else {
            return res
                .status(unAuthorizedRequest)
                .send({ message: _localize('auth.permission', req) });
        }
    } catch (err) {
        logger.error('err', err);
        throw new Error(err);
    }
}


module.exports = {
    authentication,
    checkPermission
}