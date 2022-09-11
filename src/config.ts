import { type Response } from "express";
const config = {
    port: process.env.PORT || "8000",
    rsaPrivateKeyPath: process.env.PRODUCTION ? 'Insert production key path here...' : __dirname.replace('src', 'rsa.private.key'),
    rsaPublicKeyPath: process.env.PRODUCTION ? 'Insert production key path here...' : __dirname.replace('src', 'rsa.pub.key'),
    staticDirConf: {
        dotfiles: "ignore",
        etag:true,
        extensions: ['htm', 'html'],
        index: false,
        maxAge: "7d",
        redirect: false,
        setHeaders: ( res:Response ) => {
            const actualTime = Date.now()
            res.set("x-timestamp", actualTime.toString() );
        },
    }
}
export default config;