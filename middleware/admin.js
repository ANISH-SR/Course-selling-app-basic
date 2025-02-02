require('dotenv').config();
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next){
    const token = req.headers.token;
    const decodednfo = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if(decodednfo){
        req.userId = decodednfo.id;
        next();
    }
    else{
        res.status(403).json({
            message: "Incorrect/Expired Token"
        })
    }

} 

module.exports = {
    adminMiddleware
}

