const { Router } = require('express');
const router = Router();
const invoiceController = require('../../controller/admin/invoiceController');

router
    .post(
        '/create',
        authentication,
        checkPermission,
        invoiceController.createInvoice,
    )
    .descriptor('invoice.create');
router
    .put(
        '/update/:id',
        authentication,
        checkPermission,
        invoiceController.updateInvoice,
    )
    .descriptor('invoice.update');
router
    .delete(
        '/delete/:id',
        authentication,
        checkPermission,
        invoiceController.deleteInvoice,
    )
    .descriptor('invoice.delete');
router
    .post(
        '/list',
        authentication,
        checkPermission,
        invoiceController.getAllInvoice,
    )
    .descriptor('invoice.list');

module.exports = router;
