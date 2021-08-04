let axios = require('axios');
let db  = require('../../utils/database');
class Product{
    static async createProduct(req,res){
      var store_hash = req.query.storeHash;
      db.createProduct(req.body);
      var accessToken =await db.getAccessToken(store_hash);
      var config = {
        method : "POST",
        headers : {
          'X-Auth-Token' : accessToken,
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        data : req.body,
        url: `https://api.bigcommerce.com/stores/${store_hash}/v3/catalog/products`
      }
      //console.log(config);
      try{
        let response = await axios(config);
        return res.status(200).json({"Status":"True","details":response.data ,"Message": "product added successfully"});
      }
      catch(err){
        return res.status(500).json({"Status":"False", "Message": err});
      }
    
    }
    static async updateProduct(req,res){
        var store_hash = req.query.storeHash;
        var id = req.query.id;
        db.updateProduct(req.body, id);
        var accessToken =await db.getAccessToken(store_hash);
        var config = {
          method : "PUT",
          headers : {
            'X-Auth-Token' : accessToken,
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          data : req.body,
          url: `https://api.bigcommerce.com/stores/${store_hash}/v3/catalog/products`
        }
        //console.log(config);
        try{
          let response = await axios(config);
          return res.status(200).json({"Status":"True","details":response.data ,"Message": "products updated successfully"});
        }
        catch(err){
          return res.status(500).json({"Status":"False", "Message": err});
        }
    }
    static async deleteProduct(req,res){
        var store_hash = req.query.storeHash;
        var objectId = req.query.object_id;
        var productId = req.query.product_id;
        db.deleteProduct(objectId);
        var accessToken =await db.getAccessToken(store_hash);
        var config = {
          method : "DELETE",
          headers : {
            'X-Auth-Token' : accessToken,
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          url: `https://api.bigcommerce.com/stores/${store_hash}/v3/catalog/products/${productId}`
        }
        //console.log(config);
        try{
          let response = await axios(config);
          return res.status(200).json({"Status":"True","details":response.data ,"Message": "product removed successfully"});
        }
        catch(err){
          return res.status(500).json({"Status":"False", "Message": err});
        }
    }
    static async getProduct(req,res){
        var objectId = req.query.object_id;
        db.getProduct(objectId)
        .then(function(data){
            return res.status(200).json({"Status":"True","details":data ,"Message": "Product details displayed successfully"});
        })
        .catch(function(err){
            return res.status(500).json({"Status":"False","Message": err});
        })
    }
    static async getAllProducts(req,res){
        db.getAllProducts()
        .then(function(data){
            return res.status(200).json({"Status":"True","details":data ,"Message": "Product details displayed successfully"});
        })
        .catch(function(err){
            return res.status(500).json({"Status":"False","Message": err});
        })
    }

}
module.exports = Product;