import Express from "express";
import http from "http";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";

import path from "path";

import cookieParser from "cookie-parser";

import config from "./config";

import registerRoutes from "@/routes/user/register.routes";

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
    .get('/ping', ( req , res )  => {
        res.send("ping")
    })
    .use( registerRoutes )
    .use( authMiddleware )
    // .get('/pong', authMiddleware, ( req , res )  => {
    //     res.send("pong")
    // })
    .get('/', ( req , res )  => {
        res.render('index')
    });

server.listen( PORT, () => {
    console.log( `Server listening on: http://localhost:${PORT}/` )
})