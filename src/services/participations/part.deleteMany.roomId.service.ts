import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteManyParticipations = async ( ro_id:string ) => {
    return await prisma.participations.deleteMany({
        where: {
            ro_id
        }
    })
}
export default deleteManyParticipations;