import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteRoomAdded = async ( ro_id:string ) => {
    return await prisma.room_added.delete({
        where: {
            ro_id
        }
    })
}
export default deleteRoomAdded;