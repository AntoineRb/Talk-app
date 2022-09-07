import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUserWhereUserId = async ( user_id:string ) => {
    return await prisma.users.findUnique({
        where: {
            user_id
        }
    })
}
export default findUserWhereUserId;