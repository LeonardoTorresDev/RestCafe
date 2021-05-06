const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {createServer} = require('http');

const {socketController} = require('../sockets/socketController');
const {dbConnection} = require('../database/config');

class Server{

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer(this.app);
        this.io     = require('socket.io')(this.server);
        //database connection
        this.dbConnection();
        //middlewares
        this.middlewares();
        //application routes
        this.routes();
        //sockets
        this.sockets();
    }

    async dbConnection(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors({
            origin: ['http://localhost:3000', 'https://pilot-43.herokuapp.com'],
            methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
            credentials: true
        }));
        //JSON parse
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        //file-upload
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            useTempFiles: true,
            tempFileDir: '/tmp'
        }))
        //public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/api',require('../routes/index'));
    }

    sockets(){
        this.io.on('connection', ( socket ) => { socketController(socket, this.io) } );
    }

    listen(){
        this.server.listen(this.port,()=>{
            console.log("Listening port",this.port);
        });
    }
}

module.exports=Server;