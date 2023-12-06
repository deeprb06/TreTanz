const mongoose = require('../config/db');
const Schema = mongoose.Schema;
const { CUSTOM_PAGINATE_LABELS } = require('../config/constants/common');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = { customLabels: CUSTOM_PAGINATE_LABELS };

const schema = new Schema(
    {
        PartType: { type: String },
        PartDescription: { type: String },
        ProductInfo: { type: String },
        Color: { type: String },
        Quantity: { type: String },
        PartNumber: { type: String },
        SingleP: { type: String },
        BulkP: { type: String },
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

const product = mongoose.model('product', schema, 'product');
module.exports = product;
