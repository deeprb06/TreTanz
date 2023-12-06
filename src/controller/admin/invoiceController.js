const invoiceService = require('../../services/invoice');

const createInvoice = catchAsync (async (req, res) => {
    const result = await invoiceService.createInvoice(req);
    if (result) {
        res.message = _localize('module.create', req, 'invoice');
        return util.createdDocumentResponse(result, res);
    }
    return util.failureResponse(_localize('module.createError', req, 'invoice'), res);
});

const updateInvoice = catchAsync (async (req, res) => {
    const result = await invoiceService.updateInvoice(req);
    if (result) {
        res.message = _localize('module.update', req, 'invoice');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.updateError', req, 'invoice'), res);
});

const deleteInvoice = catchAsync (async (req, res) => {
    const result = await invoiceService.deleteInvoice(req);
    if (result) {
        res.message = _localize('module.delete', req, 'invoice');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.deleteError', req, 'invoice'), res);
});

const getAllInvoice = catchAsync (async (req, res) => {
    const result = await invoiceService.getAllInvoice(req);
    if (result) {
        res.message = _localize('module.list', req, 'invoice');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.listError', req, 'invoice'), res);
});

module.exports = {
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getAllInvoice
}