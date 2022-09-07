import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findManyParticipationsWhereRoomId = async ( ro_id:string ) => {
    return await prisma.participations.findMany({
        where: {
            ro_id
        }
    })
}
export default findManyParticipationsWhereRoomId;