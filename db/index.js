const mongoose = require('mongoose')

// const connectDb = async() => {
//     return await mongoose.createConnection(process.env.MONGO_URL).asPromise();
// }

const connectDb = url =>{
    return mongoose.connect(url, (err) => {
        console.log('mongodb connected successfully')
    })
}

module.exports = connectDb