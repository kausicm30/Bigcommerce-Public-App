let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let auth = require('./app/controller/routes/authroute');
let orders = require('./app/controller/routes/ordersroute');
app.use(bodyParser.json());


const uri = 'mongodb+srv://kausic:Kausic@1224@cluster0.wg4bw.mongodb.net/Bigcommerce?retryWrites=true&w=majority';
const connectionParameters ={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, connectionParameters)
    .then(function()
    {
        console.log('Connected to mongodb successful');
    })
    .catch(function(err) {
        console.log('Error connecting to mongodb'+err);
    });


app.get('/', (req, res)=>{
    res.status(200).json({"Status":true, "Message": "Welcome"});
});


app.use('/auth',auth);
app.use('/orders',orders);

app.listen(process.env.PORT|3030, function(req,res)
{
    console.log(`Server listening the port : ${process.env.PORT}`);
});
require('dotenv').config();