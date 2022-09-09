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
import authMiddleware from "@/middlewares/jwt/jwt.validate.middleware";
// Routes
import registerRoutes from "@/routes/user/register.routes";
import loginRoutes from "@/routes/user/login.routes";
import logoutRoutes from "@/routes/user/logout.routes";
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
    // .use( Express.static( 'public' ) )
    .use( Express.json() )
    .use( cookieParser() )
    .use( Express.static( path.join( __dirname, '/../public'), {// Or dist
        dotfiles: "ignore",
        etag:true,
        extensions: ['htm', 'html'],
        index: false,
        maxAge: "7d",
        redirect: false,
        setHeaders: ( res ) => {
            const actualTime = Date.now()
            res.set("x-timestamp", actualTime.toString() );
        },
    })); 
    
app 
    .get('/', ( req , res )  => {
        res.render('index')
    })
    .use( registerRoutes )
    .use( loginRoutes )
    .use( authMiddleware )
    .use( logoutRoutes )
    // .use( dashboardRoutes );
    .get( '/dashboard/:uname', ( req, res ) => {
        const username = req.params.uname;
        console.log( username )
        return res.render( 'auth-views/dashboard', { 
            username
        });
    });


server.listen( PORT, () => {
    console.log( `Server listening on: http://localhost:${PORT}/` )
})