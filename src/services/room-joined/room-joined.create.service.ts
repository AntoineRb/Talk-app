import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateRoomJoined {
    user_id: string,
    ro_id: string
}

const createRoomJoined = async ( data:ICreateRoomJoined ) => {
    return await prisma.room_joined.create({
        data
    })
}
export default createRoomJoined;