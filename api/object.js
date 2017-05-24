var mongoose = require('mongoose');

var ObjectItemSchema = new mongoose.Schema({
    key: String,
    value: String,
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime'},
    collection: 'object'
});

module.exports = mongoose.model('ObjectItem', ObjectItemSchema);