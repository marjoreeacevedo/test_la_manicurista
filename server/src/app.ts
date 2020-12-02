import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import path from 'path';
import helmet from 'helmet';

const app: Application=express();
const server_:any=http.createServer(app);
var bodyParser = require('body-parser');
var device = require('express-device');

//-------------------------------------------Importar rutas aqui-----//
import authRoutes from './routers/authRoutes';

var socketIO = require('socket.io');
//---------------------------------------------------------------//
module.exports.io=socketIO(server_);

class Server {

  constructor(){
    this.config();
    this.routes();
  }

  config(): void{
    app.set('port', process.env.PORT || 3000);
    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());
    app.use(device.capture());
    app.use(bodyParser.json({limit: '10mb', extended: true}));
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/static', express.static(__dirname + '/public'));
    app.use('/',express.static('public'));

  }

  routes(): void{
    app.use(authRoutes);
  }

  start(): void{
    server_.listen(app.get('port'), ()=>{
      console.log('Server on port', app.get('port'));
    });
  }

}

const server=new Server();
server.start();
