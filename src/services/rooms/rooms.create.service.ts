import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateRoom {
    ro_name: string
}

const createRoom = async ( data:ICreateRoom ) => {
    return await prisma.rooms.create({
        data
    })
}
export default createRoom;