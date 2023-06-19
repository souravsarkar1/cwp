const jwt = require('jsonwebtoken');
const { blackList } = require('../blackList');


const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        if(blackList.includes(token)){
            req.json({msg : 'Please login again'});
        }
        try {
            const decoded = jwt.verify(token, process.env.secrate,);
            if(decoded){
                next();
            }
            else{
                res.json({msg : 'Token not recoznised'});
            }
        } catch (error) {
            res.json({err : error.message});
        }
    }
    else {
        res.json({msg : "please login"});
    }
}

module.exports = {
    auth
}