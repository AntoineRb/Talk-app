import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteRoom = async ( ro_id:string ) => {
    return await prisma.rooms.delete({
        where: {
            ro_id
        }
    })
}
export default deleteRoom;