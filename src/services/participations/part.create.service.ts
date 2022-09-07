import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateParticiaption {
    user_id:string,
    ro_id: string,
    pa_time: number
}

const createParticipations = async ( data:ICreateParticiaption ) => {
    return await prisma.participations.create({
        data
    })
}
export default createParticipations;