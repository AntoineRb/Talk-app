import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteManyRoomJoinedWhereUserId = async ( user_id:string ) => {
    return await prisma.room_joined.deleteMany({
        where: {
            user_id
        }
    })
}
export default deleteManyRoomJoinedWhereUserId;