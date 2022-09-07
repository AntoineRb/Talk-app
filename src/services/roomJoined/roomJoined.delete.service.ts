import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteRoomJoined = async ( rj_id:string ) => {
    return await prisma.room_joined.delete({
        where: {
            rj_id
        }
    })
}
export default deleteRoomJoined;