const mongoose = require('../config/db');
const Schema = mongoose.Schema;
const { CUSTOM_PAGINATE_LABELS } = require('../config/constants/common');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = { customLabels: CUSTOM_PAGINATE_LABELS };

const schema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        password: { type: String },
        roleId: {
            type: Schema.Types.ObjectId,
            ref: 'role',
            index: true,
        },
    },

    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
            },
        },
        timestamps: true,
    },
);

schema.plugin(mongoosePaginate);

schema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        } else {
            this.password = hash;
            next();
        }
    });
});

schema.methods.comparePassword = async function (passw) {
    return bcrypt.compare(passw, this.password);
};

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object._id = _id;
    delete object.password;
    return object;
});

const user = mongoose.model('user', schema, 'user');
module.exports = user;
