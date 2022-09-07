import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IPatchLoginPassword {
    log_id: string,
    log_password: string
}

const patchLoginPassword = async ( data:IPatchLoginPassword ) => {
    return await prisma.login.update({
        where: {
            log_id: data.log_id
        },
        data: {
            log_password: data.log_password
        }
    })
}
export default patchLoginPassword;