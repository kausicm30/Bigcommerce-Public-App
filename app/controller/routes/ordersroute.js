let express = require('express');
let router = express.Router();
let Order = require('../../services/orderservice/orderservice');

router.post('/createOrder', function(req, res)
{
    try{
        Order.createOrder(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err.message});
    }
});

module.exports = router;