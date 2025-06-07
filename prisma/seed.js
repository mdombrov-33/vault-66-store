//* node prisma/seed.js
const { PrismaClient } = require("../lib/generated/prisma");
const reviews = require("./reviewsSeed");

const prisma = new PrismaClient();

async function main() {
  for (const review of reviews) {
    await prisma.review.create({
      data: {
        clerkId: review.clerkId,
        rating: review.rating,
        comment: review.comment,
        authorName: review.authorName,
        authorImageUrl: review.authorImageUrl,
        productId: review.productId,
      },
    });
  }
  console.log("Seeded reviews successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
