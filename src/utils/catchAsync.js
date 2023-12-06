const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        return util.failureResponse(
            { message: _localize(err.message, req) },
            res,
        );
    });
};

module.exports = catchAsync;
