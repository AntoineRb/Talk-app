import Jwt from "jsonwebtoken";
import fs from "fs";

import config from "config";

const validateToken = ( token:string ) => {
    const rsaPublicKey:string = fs.readFileSync( config.rsaPublicKeyPath ).toString();
    const decodedToken = Jwt.verify( token, rsaPublicKey, { algorithms:[ 'RS512' ] } );
    if ( typeof decodedToken !== "string" ) {
        return decodedToken;
    }
}
export default validateToken;