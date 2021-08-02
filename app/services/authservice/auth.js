const { response } = require('express');
let mongoose = require('mongoose');
let axios = require('axios');
const { encrypt, decrypt } = require('../../utils/crypto');

let UserDetails =  require('../../model/usermodel');

class Auth{
    static async getAccessToken(req,res) {
        let code = req.query.code;
        let scope = req.query.scope;
        let context = req.query.context;
        let redirectUrl = process.env.NG_URL+'/auth';
        let url = `https://login.bigcommerce.com/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&scope=${scope}&grant_type=authorization_code&redirect_uri=${redirectUrl}&context=${context}`;
        
        await axios.post(url)
        .then(function(serverResponse) {
            console.log(serverResponse.data);
            var user  = new UserDetails({
                userId : serverResponse.data.user.id,
                email : serverResponse.data.user.email,
                accessToken : encrypt(serverResponse.data.access_token),
                storeHash: serverResponse.data.context.split('/')[1]
            });
            user.save(function(err){
                if(err){
                    //console.log(err);
                    return res.status(500).json({'Status':'False', 'Message':err});
                }else{
                    return res.status(200).json({'Status':'True', 'Message':'Successully generated token and stored in database'});
                }
            })
        })
        .catch(function(err){
            return res.status(500).json({'Status':'False', 'Message':err});
        })
    }
}


module.exports = Auth;