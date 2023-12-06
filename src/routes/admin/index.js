const { Router } = require('express');
const router = Router();

router.use('/user', require('./user'));
router.use('/product', require('./product'));
router.use('/invoice', require('./invoice'));

module.exports = router;