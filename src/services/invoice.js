const Invoice = require('../models/invoice');
const Product = require('../models/product');
const dbService = require('../utils/dbService');
const moment = require('moment-timezone');

const handleProductUpdate = async (productList) => {
    const updateProductPromises = productList.map(async (item) => {
        const filter = { _id: item.productId };
        const result = await Product.findOne(filter);

        if (parseInt(result.Quantity) > 0) {
            const update = Math.max(
                0,
                parseInt(result.Quantity) - item.quantity,
            );
            await Product.updateOne(filter, { $set: { Quantity: update } });
        }
    });

    await Promise.all(updateProductPromises);
};

const createInvoice = async (req) => {
    try {
        const { customerNm, category, product } = req.body;

        const totalAmount = product
            .reduce(
                (total, item) =>
                    total + parseFloat(item.bulkPrice || item.singlePrice),
                0,
            )
            .toFixed(2);

        const invoiceData = {
            customerNm,
            category,
            product,
            total: totalAmount,
            invoiceNumber: Date.now().toString(),
        };

        const data = await Invoice.create(invoiceData);

        if (data) {
            await handleProductUpdate(data.product);
            return data;
        }

        return false;
    } catch (error) {
        handleError(error, 'Error in createInvoice service');
        return false;
    }
};

const updateInvoice = async (req) => {
    try {
        const updatedInvoice = await Invoice.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
        );

        if (updatedInvoice) {
            await handleProductUpdate(updatedInvoice.product);
            return updatedInvoice;
        }

        return false;
    } catch (error) {
        handleError(error, 'Error in updateInvoice service');
    }
};

const deleteInvoice = async (req) => {
    try {
        const existingInvoice = await Invoice.findOne({ _id: req.params.id });
        if (existingInvoice) {
            await Invoice.deleteOne({ _id: req.params.id });
            return true;
        }
        return false;
    } catch (error) {
        handleError(error, 'Error in delete Invoice service');
    }
};

const getAllInvoice = async (req) => {
    try {
        let query = req.body?.query || {};
        const condition =
            query?.startDate &&
            query?.startDate.trim() !== '' &&
            query?.endDate &&
            query?.endDate.trim() !== '';
        if (condition) {
            const timezone = req.header.timezone || process.env.TZ;
            const startDate = moment
                .tz(query?.startDate, timezone)
                .hour(0)
                .minute(0)
                .second(0);
            const endDate = moment
                .tz(query?.endDate, timezone)
                .hour(23)
                .minute(59)
                .second(59);

            query.createdAt = {
                $gte: startDate,
                $lte: endDate,
            };
            delete query.startDate;
            delete query.endDate;
        }
        return dbService.getAllDocuments(
            Invoice,
            query,
            req.body?.options || {},
        );
    } catch (error) {
        handleError(error, 'Error in get all Invoice service');
    }
};
module.exports = {
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getAllInvoice,
};
