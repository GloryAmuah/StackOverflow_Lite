const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    } catch(err){
        return res.status(400).json ({ message: "Invalid or expired token!" })

    }

}

module.exports = { checkAuth } 