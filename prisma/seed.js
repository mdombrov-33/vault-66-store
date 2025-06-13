//* node prisma/seed.js
const { PrismaClient } = require('../lib/generated/prisma')
// const reviews = require("./reviewsSeed");
const skills = require('./skillsSeed')

const prisma = new PrismaClient()

async function main() {
  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }

  console.log('Seeded skills successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
