import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findRoomWhereId = async ( id:string ) => {
    return await prisma.rooms.findUnique({
        where: {
            ro_id: id
        }
    })
}
export default findRoomWhereId;