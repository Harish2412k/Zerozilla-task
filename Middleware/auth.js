const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization');
           
        if(!token)
            return res.status(400).json({ msg: "Session Expired.. Login Again.."})
        
        jwt.verify(token, process.env.ACCESS_SECRET, (err,data) => {
            if(err) return res.status(400).json({ msg: "Invalid Access Token.."})


             req.user = data._id;
             next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth;

