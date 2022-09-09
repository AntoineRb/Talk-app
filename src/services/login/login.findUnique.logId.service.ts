import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findLoginWhereId = async ( log_id:string ) => {
    return await prisma.login.findUnique({
        where: {
            log_id
        },
        select: {
            user: true,
            log_email: true,
            log_password: true,
        }
    })
}
export default findLoginWhereId;