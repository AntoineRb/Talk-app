import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findRoomWhereId = async ( ro_id:string ) => {
    return await prisma.rooms.findUnique({
        where: {
            ro_id
        }
    })
}
export default findRoomWhereId;