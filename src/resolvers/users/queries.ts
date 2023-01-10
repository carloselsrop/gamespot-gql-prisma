import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  getUsers: () => {
    return prisma.user.findMany()
  },

  getUser: (parents, args) => {
    const { id } = args
    return prisma.user.findFirst({
      where: {
        id,
      },
    })
  },
}
