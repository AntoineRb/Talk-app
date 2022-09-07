import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteManyRoomAddedWhereUserId = async ( user_id:string ) => {
    return await prisma.room_added.deleteMany({
        where: {
            user_id
        }
    })
}
export default deleteManyRoomAddedWhereUserId;