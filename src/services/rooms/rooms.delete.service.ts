import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteRoom = async ( id:string ) => {
    return await prisma.rooms.delete({
        where: {
            ro_id: id
        }
    })
}
export default deleteRoom;