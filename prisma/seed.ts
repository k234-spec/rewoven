import { PrismaClient } from '@prisma/client';
import { ALL_PRODUCTS } from '../lib/products-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Madamcutie database with 41 products & size variants...');

  // Clean existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  console.log('Cleared existing records.');

  for (const item of ALL_PRODUCTS) {
    const product = await prisma.product.create({
      data: {
        id: item.id,
        sku: item.sku,
        name: item.name,
        slug: item.slug,
        category: item.category,
        description: item.description,
        fabricDetails: item.fabricDetails,
        careGuide: item.careGuide,
        price: item.price,
        originalPrice: item.originalPrice,
        isSale: item.isSale,
        isBestseller: item.isBestseller,
        isFeatured: item.isFeatured,
        occasion: item.occasion,
        fabric: item.fabric,
        color: item.color,
        images: {
          create: item.images.map((img) => ({
            url: img.url,
            altText: img.altText,
            sortOrder: img.sortOrder,
          })),
        },
        variants: {
          create: item.sizes.map((size) => ({
            size,
            color: item.color,
            stockQty: size === 'Custom Stitching' ? 999 : 12,
          })),
        },
      },
    });

    console.log(`Inserted ${product.name} with ${item.sizes.length} size variants.`);
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
