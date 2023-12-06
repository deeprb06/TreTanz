const Joi = require('joi');

const productSchema = Joi.object({
    productId: Joi.string().required(),
    singlePrice: Joi.string().allow(''),
    bulkPrice: Joi.string().required(),
    quantity: Joi.string().required(),
});

const invoiceSchema = Joi.object({
    customerNm: Joi.string().required(),
    category: Joi.string().required(),
    product: Joi.array().items(productSchema).required(),
});

module.exports = invoiceSchema;
