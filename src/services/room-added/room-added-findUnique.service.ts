import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUniqueRoomAdded = async ( user_id:string, room_id:string  ) => {
    return await prisma.room_added.findMany({
        where: {
            user_id,
            ro_id: room_id,
        }
    });
}
export default findUniqueRoomAdded;