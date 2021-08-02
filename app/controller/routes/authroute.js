let express = require('express');
let router = express.Router();
let AuthService = require('../../services/authservice/auth');

router.get('/', async function(req, res)
{
    try{
        AuthService.getAccessToken(req,res);
    }
    catch(err){
        res.status(401).json({'Status': 'False', 'Message': err});
    }
});

module.exports = router;