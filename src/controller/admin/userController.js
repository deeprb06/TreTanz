const userService = require('../../services/user');

const addUser = catchAsync (async (req, res) => {
    const result = await userService.addUser(req);
    if (result) {
        res.message = _localize('module.create', req, 'user');
        return util.createdDocumentResponse(result, res);
    }
    return util.failureResponse(_localize('module.createError', req, 'user'), res);
})

const login = catchAsync (async (req, res) => {
    const result = await userService.login(req);
    if (result) {
        res.message = _localize('module.get', req, 'user');
        return util.loginSuccess(result, res);
    }
    return util.failureResponse(_localize('module.getError', req, 'user'), res);
})

module.exports = {
    addUser,
    login
}