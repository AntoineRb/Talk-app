import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUser = async ( id:string ) => {
    return await prisma.users.delete({
        where: {
            user_id: id
        }
    })
}
export default deleteUser;