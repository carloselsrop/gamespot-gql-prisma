import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  signUp: (parents, args) => {
    return prisma.user.create({
      data: {
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        email: args.input.email,
        password: args.input.password,
      },
    })
  },
}
