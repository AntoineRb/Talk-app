import Express from "express";
import http from "http";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";

import config from "./config";


const app = Express();
const server = new http.Server( app );
const io = new Server( server );

const peerServer = ExpressPeerServer( server );

const PORT = config.port;

app
    .use( '/peersjs', peerServer )
    .set( 'view engine', 'pug' )
    .use( Express.static( 'public' ) );
    
app
    .get('/', ( req , res )  => {
        res.render('index')
    });

server.listen( PORT, () => {
    console.log( `Server listening on: http://localhost:${PORT}/` )
})