const jwt = require('jsonwebtoken');

const authenticate = (req,res,next)=>{
    req.user = "Lot";
    next();
}
module.exports = authenticate;