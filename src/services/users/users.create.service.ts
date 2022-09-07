import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateUser {
    username: string,
    log_id: string
}

const createUser = async ( data:ICreateUser ) => {
    return await prisma.users.create({
        data
    })
}
export default createUser;