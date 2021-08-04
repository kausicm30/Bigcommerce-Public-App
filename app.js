let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let auth = require('./app/controller/routes/auth');
let orders = require('./app/controller/routes/order');
let products = require('./app/controller/routes/product');
let db = require('./app/utils/database');
db.dbConnection();

app.use(bodyParser.json());


app.get('/', async (req, res)=>{
    res.status(200).json({"Status":true, "Message": "Welcome"});
});


app.use('/oauth',auth);
app.use('/products',products);
app.use('/orders',orders);

app.listen(process.env.PORT|3030, function(req,res)
{
    console.log(`Server listening the port : ${process.env.PORT}`);
});
require('dotenv').config();