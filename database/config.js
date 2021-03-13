const mongoose=require('mongoose');

const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('Database online');
    }catch(error){
        console.log(error);
        throw new Error('Database conection failed');
    }
}

module.exports={
    dbConnection
};