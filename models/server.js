const express=require('express');
const cors=require('cors');

class Server{

    constructor() {
        this.app=express();
        this.port=process.env.PORT;       
        this.userPath='/users';
        //middlewares
        this.middlewares();
        //application routes
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //JSON parse
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        //public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.userPath,require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Listening port",this.port);
        });
    }
}

module.exports=Server;