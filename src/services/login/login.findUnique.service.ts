import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUniqueLogin = async ( log_id:string ) => {
    return await prisma.login.findUnique({
        where: {
            log_id
        },
        select: {
            user: true
        }
    })
}
export default findUniqueLogin;