let mongoose = require('mongoose');
var  productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    price: {type: String, require: true},
    weight : {type: Number, require: true},
    type : {type: String, require: true}
});

module.exports = mongoose.model('Product',productSchema,'products');