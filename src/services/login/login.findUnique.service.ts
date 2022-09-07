import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async ( id:string ) => {
    return await prisma.login.findUnique({
        where: {
            log_id: id
        }
    })
}
export default createUser;