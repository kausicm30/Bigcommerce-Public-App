let mongoose = require('mongoose');
let axios = require('axios');
const { encrypt, decrypt } = require('../../utils/crypto');
let OrderModel = require('../../model/ordermomdel');

class Order{
    static async createOrder(req,res){
        var order = {
            billing_address: {
                first_name: req.body.billing_address.first_name,
                last_name: req.body.billing_address.last_name,
                street_1: req.body.billing_address.street_1,
                city: req.body.billing_address.city,
                state: req.body.billing_address.state,
                zip: req.body.billing_address.zip,
                country: req.body.billing_address.country,
                country_iso2: req.body.billing_address.country_iso2,
                email: req.body.billing_address.email,
              },
              products: [
                {
                  name: req.body.products[0].name,
                  quantity: req.body.products[0].quantity,
                  price_inc_tax: req.body.products[0].price_inc_tax,
                  price_ex_tax: req.body.products[0].price_ex_tax
                }
              ]
        };
        await new OrderModel(order).save(function (err) {
            if(err){
                console.log(err);
                return res.status(500).json({"Status":"False", "Message": err});
            }
        });

        return res.status(200).json({"Status":"True", "Message": "successfully order created"});
    }
}
module.exports = Order;