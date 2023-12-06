const productService = require('../../services/product');

const importProduct = catchAsync (async (req, res) => {
    const result = await productService.importProduct(req);
    if (result) {
        res.message = _localize('module.create', req, 'products');
        return util.createdDocumentResponse(result, res);
    }
    return util.failureResponse(_localize('module.createError', req, 'products'), res);
});

const getAllProduct = catchAsync (async (req, res) => {
    const result = await productService.getAllProduct(req);
    if (result) {
        res.message = _localize('module.list', req, 'products');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.listError', req, 'products'), res);
})

module.exports = {
    importProduct,
    getAllProduct
}