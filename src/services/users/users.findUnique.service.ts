import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUserWhereId = async ( id:string ) => {
    return await prisma.users.findUnique({
        where: {
            user_id: id
        }
    })
}
export default findUserWhereId;