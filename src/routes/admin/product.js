const { Router } = require('express');
const router = Router();
const productController = require('../../controller/admin/productController');
const upload = require('../../middleware/multer');

router
    .post(
        '/import',
        authentication,
        upload.single('product'),
        productController.importProduct,
    )
    .descriptor('product.create');
router
    .post('/list', authentication, productController.getAllProduct)
    .descriptor('product.list');

module.exports = router;
