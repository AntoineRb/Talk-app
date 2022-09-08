import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteManyRoomJoinedWhereRoomId = async ( ro_id:string ) => {
    return await prisma.room_joined.deleteMany({
        where: {
            ro_id
        }
    })
}
export default deleteManyRoomJoinedWhereRoomId;