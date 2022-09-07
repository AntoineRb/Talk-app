import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateLogin {
    log_email: string,
    log_password: string
}

const createLogin = async ( data:ICreateLogin ) => {
    return await prisma.login.create({
        data
    })
}
export default createLogin;