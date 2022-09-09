// 3rd party modules
import Express from "express";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
import cookieParser from "cookie-parser";
// Node core modules
import path from "path";
import http from "http";
// Config module
import config from "./config";
// Middleware
import authMiddleware from "@/middlewares/jwt/jwt.validate.middleware";
// Routes
import registerRoute from "@/routes/user/register.routes";
import loginRoute from "@/routes/user/login.routes";
import logoutRoute from "@/routes/user/logout.routes";


const app = Express();
const server = new http.Server( app );
const io = new Server( server );
const peerServer = ExpressPeerServer( server );
const PORT = config.port;

app
    .use( '/peersjs', peerServer )
    .set( 'view engine', 'pug' )
    .set( 'views', path.join( __dirname, '/views' ) )
    .use( Express.static( 'public' ) )
    .use( Express.json() )
    .use( cookieParser() );
    
app 
    .get('/', ( req , res )  => {
        res.render('index')
    })
    .use( registerRoute )
    .use( loginRoute )
    .use( authMiddleware )
    .use( logoutRoute );

server.listen( PORT, () => {
    console.log( `Server listening on: http://localhost:${PORT}/` )
})