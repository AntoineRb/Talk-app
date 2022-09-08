import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteLogin = async ( log_id:string ) => {
    return await prisma.login.delete({
        where: {
            log_id
        }
    })
}
export default deleteLogin;