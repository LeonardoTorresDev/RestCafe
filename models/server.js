const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');

const {dbConnection}=require('../database/config');

class Server{

    constructor() {
        this.app=express();
        this.port=process.env.PORT;       

        //database connection
        this.dbConnection();
        //middlewares
        this.middlewares();
        //application routes
        this.routes();
    }

    async dbConnection(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //JSON parse
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        //cookie parse
        this.app.use(cookieParser());
        //public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('',require('../routes/index'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Listening port",this.port);
        });
    }
}

module.exports=Server;