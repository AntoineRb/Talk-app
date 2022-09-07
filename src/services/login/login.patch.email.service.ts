import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IPatchLoginEmail {
    log_id: string,
    log_email: string
}

const patchLoginEmail = async ( data:IPatchLoginEmail ) => {
    return await prisma.login.update({
        where: {
            log_id: data.log_id
        },
        data: {
            log_email: data.log_email
        }
    })
}
export default patchLoginEmail;