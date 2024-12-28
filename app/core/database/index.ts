import { PrismaClient } from '@prisma/client'

const singleton = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

if (!singleton.prisma) {
  singleton.prisma = new PrismaClient({
    log: ['error'],
  })
}

export const Database = singleton.prisma
