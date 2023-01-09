import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  createBrand: (parents, args) => {
    return prisma.brand.create({
      data: {
        name: args.input.name,
      },
    })
  },

  updateBrand: (parents, args) => {
    return prisma.brand.update({
      data: {
        name: args.input.name,
      },
      where: {
        id: Number(args.input.id),
      },
    })
  },

  deleteBrand: (parents, args) => {
    return prisma.brand.delete({
      where: {
        id: Number(args.input.id),
      },
    })
  },
}
