let mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var orderSchema = new  mongoose.Schema({
    billing_address :{
        first_name : {type: String, require: true},
        last_name : {type: String, require: true},
        street_1 :{type: String, require: true},
        city : {type: String,require: true},
        state : {type: String, require: true},
        zip : {type: Number, require: true},
        country : {type: String, require: true},
        country_iso2 : {type: String, require:true},
        email : {type: String, require: true}
    },
    products :[
        {
            name : {type: String, require: true},
            quantity : {type: Number, require: true},
            price_inc_tax : {type: Number, require: true},
            price_ex_tax : {type: Number,require: true}
        }
    ]
});
module.exports = mongoose.model('Order', orderSchema, 'orders')