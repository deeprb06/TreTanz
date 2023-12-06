const joi = require('joi');

const registerSchemaKeys = joi
    .object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        roleId: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    })
    .unknown(false);

const loginSchemaKeys = joi
    .object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    })
    .unknown(false);

module.exports = {
    registerSchemaKeys,
    loginSchemaKeys,
};
