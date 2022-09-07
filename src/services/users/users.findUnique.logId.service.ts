import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUserWhereLogId = async ( log_id:string ) => {
    return await prisma.users.findUnique({
        where: {
            log_id
        }
    })
}
export default findUserWhereLogId;