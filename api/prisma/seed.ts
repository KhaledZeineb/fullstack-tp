
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("La variable DATABASE_URL est manquante.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

type DummyProduct = {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
  category: string;
};

async function main() {
  const response = await fetch(
    "https://dummyjson.com/products?limit=100",
  );

  if (!response.ok) {
    throw new Error(`Erreur DummyJSON : ${response.status}`);
  }

  const data = (await response.json()) as {
    products: DummyProduct[];
  };

  // Supprimer les produits existants avant l'importation.
  await prisma.product.deleteMany();

  for (const product of data.products) {
    const category = await prisma.category.upsert({
      where: { name: product.category },
      update: {},
      create: { name: product.category },
    });

    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        categoryId: category.id,
      },
    });
  }

  console.log(`Importation réussie : ${data.products.length} produits.`);
}

main()
  .catch((error) => {
    console.error("Erreur pendant le Seed :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
