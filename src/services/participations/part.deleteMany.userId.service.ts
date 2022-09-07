import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteManyParticipations = async ( user_id:string ) => {
    return await prisma.participations.deleteMany({
        where: {
            user_id
        }
    })
}
export default deleteManyParticipations;