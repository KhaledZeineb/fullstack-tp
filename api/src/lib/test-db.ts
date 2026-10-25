import "dotenv/config";
import { prisma } from "./prisma.js";

try {
  await prisma.$connect();

  const categories = await prisma.category.count();
  const products = await prisma.product.count();

  console.log("Connexion PostgreSQL réussie !");
  console.log("Nombre de catégories :", categories);
  console.log("Nombre de produits :", products);
} catch (error) {
  console.error("Erreur de connexion à PostgreSQL :", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}