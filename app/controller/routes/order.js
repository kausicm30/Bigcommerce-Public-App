let express = require('express');
let router = express.Router();
let Order = require('../../services/orderservice/order');

router.post('/v2/create', function(req, res)
{
    try{
        Order.createOrder(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err.message});
    }
});

router.post('/v2/update', function(req, res)
{
    try{
        Order.updateOrder(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err.message});
    }
});

router.get('/v2/delete', async (req, res) => {
    try{
        Order.deleteOrder(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err});
    }
});
router.get('/v2/deleteAll', function(req, res)
{
    try{
        Order.deleteAllOrders(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err.message});
    }
});
router.get('/v2/getOrder', function(req, res)
{
    try{
        Order.getOrder(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err.message});
    }
});
router.get('/v2/getAllOrders', function(req, res)
{
    try{
        Order.getAllOrders(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err.message});
    }
});

module.exports = router;