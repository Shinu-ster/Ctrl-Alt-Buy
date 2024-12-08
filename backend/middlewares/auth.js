const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    
    const authorization = req.headers.authorization;
    
    if (!authorization) {
        return res.status(401).json({
            status: "Failed",
            message: "Authorization Failed! No token found."
        });
    }

   
    const token = authorization.split("Bearer ")[1];
    
    if (!token) {
        return res.status(401).json({
            status: "Failed",
            message: "Authorization Failed! No token found."
        });
    }

    try {
       
        const checkToken = jwt.verify(token, process.env.jwt_secret_key);
        req.userId = checkToken; 
        
        console.log('Auth Checked');
        next(); 
    } catch (error) {
        return res.status(401).json({
            status: "Failed",
            message: "Authorization Failed! Invalid token."
        });
    }
};

module.exports = auth;