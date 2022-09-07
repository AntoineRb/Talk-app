import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUserWhereLogId = async ( logId:string ) => {
    return await prisma.users.findUnique({
        where: {
            log_id: logId
        }
    })
}
export default findUserWhereLogId;