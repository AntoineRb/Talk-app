import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUser = async ( user_id:string ) => {
    return await prisma.users.delete({
        where: {
            user_id
        }
    })
}
export default deleteUser;