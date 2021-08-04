let axios = require('axios');
let db  = require('../../utils/database');
class Order{
    static async createOrder(req,res){
      var store_hash = req.query.storeHash;
      db.createOrder(req);
      var accessToken =await db.getAccessToken(store_hash);
      var config = {
        method : "POST",
        headers : {
          'X-Auth-Token' : accessToken,
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        data : req.body,
        url: `https://api.bigcommerce.com/stores/${store_hash}/v2/orders`
      }
      //console.log(config);
      try{
        let response = await axios(config);
        return res.status(200).json({"Status":"True","details":response.data, "Message": "successfully order created"});
      }
      catch(err){
        return res.status(200).json({"Status":"True", "Message": err});
      }
    }
    static async updateOrder(req, res) {
      var store_hash = req.query.storeHash;
      var object_id = req.query.objectId
      var order_id = req.query.orderId;
      db.updateOrder(req.body,object_id);
      var accessToken =await db.getAccessToken(store_hash);
      var config = {
        method : "PUT",
        headers : {
          'X-Auth-Token' : accessToken,
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        data : req.body,
        url: `https://api.bigcommerce.com/stores/${store_hash}/v2/orders/${order_id}`
      }
      //console.log(config);
      try{
        let response = await axios(config);
        return res.status(200).json({"Status":"True","details":response.data, "Message": "successfully order Updated"});
      }
      catch(err){
        return res.status(200).json({"Status":"True", "Message": "successfully order Updated"});
      }
      
    }
    static async deleteOrder(req,res){
      var store_hash = req.query.storeHash;
      var objectId = req.query.object_id;
      var OrderId = req.query.order_id;
      db.deleteOrder(objectId);
      var accessToken =await db.getAccessToken(store_hash);
      var config = {
        method : "DELETE",
        headers : {
          'X-Auth-Token' : accessToken,
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        url: `https://api.bigcommerce.com/stores/${store_hash}/v2/orders/${OrderId}`
      }
      //console.log(config);
      try{
        let response = await axios(config);
        return res.status(200).json({"Status":"True","details":response.data ,"Message": "order removed successfully"});
      }
      catch(err){
        return res.status(500).json({"Status":"False", "Message": err});
      }
  }
    static async deleteAllOrders(req, res) {
      var store_hash = req.query.storeHash;
      db.deleteAllOrders();
      var accessToken =await db.getAccessToken(store_hash);
      var config = {
        method : "DELETE",
        headers : {
          'X-Auth-Token' : accessToken,
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        url: `https://api.bigcommerce.com/stores/${store_hash}/v2/orders`
      }
      //console.log(config);
      try{
        let response = await axios(config);
        //console.log(response.data);
        return res.status(200).json({"Status":"True","Message": "All orders removed successfully"});
      }
      catch(err){
        //console.log(err);
        return res.status(200).json({"Status":"True", "Message": err});
      }
    }
    static async getOrder(req,res){
      var objectId = req.query.object_id;
      db.getOrder(objectId)
      .then(function(data){
          return res.status(200).json({"Status":"True","details":data ,"Message": "Order details displayed successfully"});
      })
      .catch(function(err){
          return res.status(500).json({"Status":"False","Message": err});
      })
  }
  static async getAllOrders(req,res){
      db.getAllOrders()
      .then(function(data){
          return res.status(200).json({"Status":"True","details":data ,"Message": "Order details displayed successfully"});
      })
      .catch(function(err){
          return res.status(500).json({"Status":"False","Message": err});
      })
  }
}
module.exports = Order;