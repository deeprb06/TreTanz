const mongoose = require('../config/db');
const Schema = mongoose.Schema;
const { CUSTOM_PAGINATE_LABELS } = require('../config/constants/common');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = { customLabels: CUSTOM_PAGINATE_LABELS };

const schema = new Schema(
    {
        customerNm: { type: String },
        category: { type: String },
        total: { type: Number },
        product: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'product',
                },
                singlePrice: {
                    type: String
                },
                bulkPrice: {
                    type: String
                },
                quantity: {
                    type: Number
                }
            },
        ],
        invoiceNumber: {
            type: String
        }
    },
    {
        timestamps: true,
    },
);

schema.plugin(mongoosePaginate);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object._id = _id;
    delete object.passwords;
    return object;
});

const invoice = mongoose.model('invoice', schema, 'invoice');
module.exports = invoice;
