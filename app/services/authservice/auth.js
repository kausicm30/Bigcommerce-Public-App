let axios = require('axios');
let db = require('../../utils/database');
class Auth{
    static async getAccessToken(req,res) {
        let code = req.query.code;
        let scope = req.query.scope;
        let context = req.query.context;
        let redirectUrl = process.env.NG_URL+'/oauth';
        let url = `https://login.bigcommerce.com/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&scope=${scope}&grant_type=authorization_code&redirect_uri=${redirectUrl}&context=${context}`;
        await axios.post(url)
        .then(function(serverResponse) {
            //console.log(serverResponse.data);
            db.addUserDetails(serverResponse.data)
            .then(function() {
                return res.status(200).json({'Status':'True', 'Message':'Successully generated token and stored in database'});
            })
            .catch(function(err) {
                return res.status(500).json({'Status':'False', 'Message':err});
            });
        })
        .catch(function(err){
            return res.status(500).json({'Status':'False', 'Message':err});
        })
    }
}


module.exports = Auth;