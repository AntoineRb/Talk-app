import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findManyRoomJoinedWhereUserId = async ( user_id:string ) => {
    return await prisma.room_joined.findMany({
        where: {
            user_id 
        }
    })
} 
export default findManyRoomJoinedWhereUserId;