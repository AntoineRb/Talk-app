import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async ( log_id:string ) => {
    return await prisma.login.findUnique({
        where: {
            log_id
        }
    })
}
export default createUser;