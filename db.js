const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://admin:admin@mycluster.dj37n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
            useNewUrlParser : true,
            useUnifiedTopology:true,
            useFindAndModify: false
    })

        console.log('MongoDB connected')
    }

    
    catch(err){
         console.error(err)
         process.exit(1);
    }
}

module.exports = connectDB;