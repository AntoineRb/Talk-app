import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IPatchUser {
    user_id: string,
    username: string
}

const updateUser = async ( data:IPatchUser ) => {
    return await prisma.users.update({
        where: {
            user_id: data.user_id
        },
        data: {
            username: data.username
        }
    })
}
export default updateUser;