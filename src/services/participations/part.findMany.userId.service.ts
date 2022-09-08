import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findManyParticipationsWhereUserId = async ( user_id:string ) => {
    return await prisma.participations.findMany({
        where: {
            user_id
        },
        select: {
            room: true
        }
    })
}
export default findManyParticipationsWhereUserId;