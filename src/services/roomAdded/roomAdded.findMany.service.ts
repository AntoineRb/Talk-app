import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findManyRoomAddedWhereUserId = async ( user_id:string ) => {
    return await prisma.room_added.findMany({
        where: {
            user_id
        }
    })
}
export default findManyRoomAddedWhereUserId;