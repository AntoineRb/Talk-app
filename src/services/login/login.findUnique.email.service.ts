import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findLoginWhereEmail = async ( log_email:string ) => {
    return await prisma.login.findUnique({
        where: {
            log_email
        },
        select: {
            user: true,
            log_email: true,
            log_password: true,
        }
    })
}
export default findLoginWhereEmail;