import bcrypt from "bcrypt";

const comparePassword = ( password:string, hash:string ) => {
    let result:boolean = false;
    result = bcrypt.compareSync( password, hash ); 
    return result;
}
export default comparePassword;