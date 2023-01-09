import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  getUsers: () => {
    return prisma.user.findMany()
  },
}
