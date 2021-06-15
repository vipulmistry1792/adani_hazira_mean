const mongoose   = require('mongoose')
const Schema     = mongoose.Schema;
const schema = new Schema({
    Data: Object,
    createdDate: { type: Date, default: Date.now }
});
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Mqtt_data', schema);