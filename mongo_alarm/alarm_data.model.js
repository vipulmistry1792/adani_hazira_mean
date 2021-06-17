
const mongoose   = require('mongoose')
const Schema     = mongoose.Schema;
const schemaOptions ={
timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
};
const schema     = new Schema(
    //    { 
    //     t_1     :   String,
    //     t_2     :   String,
    //     t_3     :   String,
	//     t_4     :   String,
	//     t_5     :   String,
    //     t_6     :   String,
    //     t_7     :   String,
    //     t_8     :   String,
	//     t_9     :   String,
	//     t_10    :   String,
    //   },
    //   
      //{any:{}},
     // {any:{}},
     {any:mongoose.Schema.Types.Mixed},
      {strict:false}
      
   );
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Alarm_data', schema);
