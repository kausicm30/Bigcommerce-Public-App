let express = require('express');
let router = express.Router();
let Product = require('../../services/productservice/product');

router.post('/v3/create', async (req, res) => {
    try{
        Product.createProduct(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err});
    }
});
router.post('/v3/update', async (req, res) => {
    try{
        Product.updateProduct(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err});
    }
});
router.get('/v3/delete', async (req, res) => {
    try{
        Product.deleteProduct(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err});
    }
});
router.get('/v3/getProduct', async (req, res) => {
    try{
        Product.getProduct(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err});
    }
});
router.get('/v3/getAllProducts', async (req, res) => {
    try{
        Product.getAllProducts(req, res);
    }
    catch(err){
        res.status(500).json({'Status':'False', 'Message': err});
    }
});


module.exports = router;