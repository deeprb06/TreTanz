const express = require('express');
const router = express.Router();
const {
    registerSchemaKeys,
    loginSchemaKeys,
} = require('../../utils/validations/user');
const userController = require('../../controller/admin/userController');

router.post('/create', validate(registerSchemaKeys), userController.addUser);
router.post('/login', validate(loginSchemaKeys), userController.login);

module.exports = router;
