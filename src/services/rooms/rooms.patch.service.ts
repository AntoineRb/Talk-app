import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IPatchRoom {
    ro_id: string,
    ro_name: string
}

const patchRoom = async ( data:IPatchRoom ) => {
    return await prisma.rooms.update({
        where: {
            ro_id: data.ro_id
        }, 
        data: {
            ro_name: data.ro_name
        }
    })
}
export default patchRoom;