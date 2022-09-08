import bcrypt from "bcrypt";

const encryptPassword = ( password:string ) => {
    const SALT_ROUNDS:number = 10;
    const passwordToEncrypt:string = password;
    let pwdSalt:string|undefined;
    let pwdHash:string|undefined;
    pwdSalt = bcrypt.genSaltSync( SALT_ROUNDS );
    pwdHash = bcrypt.hashSync( passwordToEncrypt, pwdSalt );
    if ( pwdHash && pwdSalt ) {
        return pwdHash
    }
}
export default encryptPassword;