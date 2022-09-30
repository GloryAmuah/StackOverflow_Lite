const jwt = require('jsonwebtoken');
require("dotenv").config();


const checkAuth = async (req, res, next) => {
    try{
        const auth = req.headers.authorization
        if (!auth) throw new Error('You need to sign in')
        
        const token = auth.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decodedToken.userId
        next();
    } catch(err){
            return res.status(400).json ({
            is_success: false,
            message: err.message,
            data: null
        })
    }

}

module.exports = { checkAuth } 