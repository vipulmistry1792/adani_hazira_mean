
const mongoose   = require('mongoose')
const Schema     = mongoose.Schema;
const schema = new Schema({
    t_1 :String,
    t_2 :String,
    t_3 :String,
    t_4 :String,
},
{timestamps:true},
);
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Mqtt_data', schema);
