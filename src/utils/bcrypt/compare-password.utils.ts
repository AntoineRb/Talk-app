import bcrypt from "bcrypt";

const compatePassword = ( password:string, hash:string ) => {
    let result:boolean = false;
    result = bcrypt.compareSync( password, hash ); 
    return result;
}
export default compatePassword;