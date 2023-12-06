const mongoose = require('../config/db');
const mongoosePaginate = require('mongoose-paginate-v2');
const { CUSTOM_PAGINATE_LABELS } = require('../config/constants/common');

mongoosePaginate.paginate.options = { customLabels: CUSTOM_PAGINATE_LABELS };
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        permission_id: {
            type: Schema.Types.ObjectId,
            ref: 'permission',
        },
        role_id: {
            type: Schema.Types.ObjectId,
            ref: 'role',
        },
        canDel: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
        toJSON: { virtuals: true },
    },
);

schema.plugin(mongoosePaginate);

const permissionRole = mongoose.model('permissionRole', schema, 'permissionRole',);

module.exports = permissionRole;
