import Express from "express";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import config from "./config";
import registerRoutes from "@/routes/user/register.routes";
import loginRoutes from "@/routes/user/login.routes";
import authMiddleware from "@/middlewares/jwt/jwt.validate.middleware"

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
    .use( registerRoutes )
    .use( loginRoutes )
    .use( authMiddleware );

server.listen( PORT, () => {
    console.log( `Server listening on: http://localhost:${PORT}/` )
})