import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  getBrand: (parents, args): any => {
    const { id } = args
    const brand = prisma.brand.findFirst({
      where: id,
    })
    return brand
  },

  getBrands: (): any => {
    return prisma.brand.findMany()
  },
}
