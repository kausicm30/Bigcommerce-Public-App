let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
let Order = require('../model/order');
let User = require('../model/user');
let Product = require('../model/product')
const { encrypt, decrypt } = require('./crypto');

class Database{
    static async dbConnection(){
        const uri = 'mongodb+srv://kausic:Kausic@1224@cluster0.wg4bw.mongodb.net/Bigcommerce?retryWrites=true&w=majority';
        const connectionParameters ={
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        mongoose.connect(uri, connectionParameters)
        .then(function(){
            console.log('Connected to mongodb successful');
        })
        .catch(function(err) {
            console.log('Error connecting to mongodb'+err);
        });
    }
    static async addUserDetails(data){
        console.log(data);
        var user  = new User({
            userId : data.user.id,
            email : data.user.email,
            accessToken : encrypt(data.access_token),
            storeHash: data.context.split('/')[1]
        });
        //console.log(user);
        user.save(function(err){
            if(err){
                console.log(err);
            }
        });
    }
    static async getAccessToken(store_hash){
        let userDetails = await User.findOne({storeHash : store_hash},function (err,data){
            if(err){
              return res.status(500).json({"Status":"False", "Message": err});
            }
          });
        return decrypt(userDetails.accessToken);
    }
    static async createProduct(product)
    {
        var details = {
            name : product.name,
            price : product.price,
            weight : product.weight,
            type : product.type
        }
        await new Product(details).save((err)=>{
            if(err)
                console.log(err);
        })
    }
    static async updateProduct(product, id)
    {
        //for(let i=0; i<product.length; i++)
        //{
            await Product.findByIdAndUpdate(id,product[0],function(err){
                if(err){
                    console.log(err);
                }
            })
        //}
    }
    static async deleteProduct(id){
        await Product.findByIdAndDelete(id,function(err){
            if(err)
                console.log(err);
        });
    }
    static async getProduct(id){
        return Product.findOne({_id:id},function(err){
            if(err){
                console.log(err);
            }
        })
    }
    static async getAllProducts(id){
        return Product.find(function(err){
            if(err){
                console.log(err);
            }
        })
    }

    static async createOrder(data)
    {
        var order = {
            storeHash: data.query.store_hash,
            billing_address: {
                first_name: data.body.billing_address.first_name,
                last_name: data.body.billing_address.last_name,
                street_1: data.body.billing_address.street_1,
                city: data.body.billing_address.city,
                state: data.body.billing_address.state,
                zip: data.body.billing_address.zip,
                country: data.body.billing_address.country,
                country_iso2: data.body.billing_address.country_iso2,
                email: data.body.billing_address.email,
              },
              products: [
                {
                  name: data.body.products[0].name,
                  quantity: data.body.products[0].quantity,
                  price_inc_tax: data.body.products[0].price_inc_tax,
                  price_ex_tax: data.body.products[0].price_ex_tax
                }
              ]
        };
        await new Order(order).save(function (err) {
            if(err){
                console.log(err);
            }
        });
    }
    static async updateOrder(order, id)
    {
        //for(let i=0; i<product.length; i++)
        //{
            await Order.findByIdAndUpdate(id,order,function(err){
                if(err){
                    console.log(err);
                }
            })
        //}
    }
    static async deleteOrder(id){
        await Order.findByIdAndDelete(id,function(err){
            if(err)
                console.log(err);
        });
    }
    static async deleteAllOrders()
    {
        await Order.deleteMany();
    }
    static async getOrder(id){
        return Order.findOne({_id:id},function(err){
            if(err){
                console.log(err);
            }
        })
    }
    static async getAllOrders(id){
        return Order.find(function(err){
            if(err){
                console.log(err);
            }
        })
    }

}
module.exports = Database;