const jwt = require('jsonwebtoken')

const createAccessToken = (user ) => {
    return jwt.sign(user, process.env.ACCESS_SECRET, {expiresIn : '1d'})

}

module.exports = { createAccessToken }

