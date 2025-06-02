// const { PrismaClient } = require("../lib/generated/prisma");
// const products = require("./products.json");
// const prisma = new PrismaClient();

// async function main() {
//   for (const product of products) {
//     await prisma.product.create({
//       data: product,
//     });
//   }
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

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
