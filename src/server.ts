// 3rd party modules
import Express from "express";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
import cookieParser from "cookie-parser";
// Node core modules
import path from "path";
import http from "http";
// Visio-app Config module
import config from "./config";
// Middleware
import authMiddleware from "@/middlewares/auth/jwt/jwt.validate.middleware";
// Routes
import indexRoutes from "@/routes/index.routes"
import registerRoutes from "@/routes/user/auth/register.routes";
import loginRoutes from "@/routes/user/auth/login.routes";
import logoutRoutes from "@/routes/user/auth/logout.routes";
import dashboardRoutes from "@/routes/dashboard/dashboard.routes";


const app = Express();
const server = new http.Server( app );
const io = new Server( server );
const peerServer = ExpressPeerServer( server );
const PORT = config.port;

app
    .use( '/peersjs', peerServer )
    .set( 'view engine', 'pug' )
    .set( 'views', path.join( __dirname, '/views' ) )
    .use( Express.json() )
    .use( cookieParser() )
    .use( Express.static( path.join( __dirname, '/../public'), config.staticDirConf )); 
    
app 
    .use( indexRoutes )
    .use( registerRoutes )
    .use( loginRoutes )
    .use( authMiddleware )
    .use( logoutRoutes )
    .use( dashboardRoutes );


server.listen( PORT, () => {
    console.log( `Server listening on: http://localhost:${PORT}/` );
})