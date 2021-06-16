
const mongoose   = require('mongoose')
//const Schema     = mongoose.Schema;
const schema = new mongoose.Schema(
       { 
        t_1    :   String,
        t_2    :   String,
        t_3    :   String,
	    t_4    :   String,
	    t_5    :   String,
        t_6    :   String,
        t_7    :   String,
        t_8    :   String,
	    t_9    :   String,
	    t_10    :   String,
      },
      { timestamps   : true }
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
