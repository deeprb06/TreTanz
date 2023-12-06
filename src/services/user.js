const User = require('../models/user');
const { USER_ROLES } = require('../config/constants/common');
const { AUTH } = require('../config/config');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');

const generateToken = (user, secret = AUTH.JWT_SECRET, expires = '1h') => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            mobNo: user.mobNo,
        },
        secret,
        {
            expiresIn: expires,
        },
    );
};

const existingUser = async (body) => {
    return User.findOne({ email: body.email })
}

const addUser = async (req) => {
    try {
        const existingCandidate = await existingUser(req.body);
        if (existingCandidate) {
            throw new Error(_localize('module.alreadyExist', req, 'email'));
        }
        const findRole = await Role.findOne({ code: USER_ROLES.CANDIDATE }, { _id: 1, code: 1 });
        const candidateData = {
            ...req.body,
            roleId: findRole._id,
        };
        return User.create(candidateData);
    } catch (error) {
        handleError(error, 'Error in create user service');
    }
}

const login = async (req) => {
    try {
        const existingCandidate = await existingUser(req.body);
        if (!existingCandidate) {
            throw new Error(_localize('auth.accountNotFound', req, 'email'));
        }
        const matchPassword = await existingCandidate.comparePassword(req.body.password);
        if (!matchPassword) {
            throw new Error(_localize('auth.passwordWrong', req));
        }
        const data = {
            user: existingCandidate,
            access_token: generateToken(existingCandidate),
        }
        return data;
    } catch (error) {
        handleError(error, 'Error in login user service');
    }
}

module.exports = {
    addUser,
    login
}