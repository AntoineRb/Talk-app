import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateRoomAdded {
    user_id: string,
    ro_id:string
}

const createRoomAdded = async ( data:ICreateRoomAdded ) => {
    return await prisma.room_added.create({
        data
    })
}
export default createRoomAdded;