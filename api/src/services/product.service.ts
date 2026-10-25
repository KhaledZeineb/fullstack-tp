
import { prisma } from "../lib/prisma.js";

type ProductListQuery = {
  limit: number;
  skip: number;
  q?: string;
  category?: string;
};

export async function getAllProducts(query: ProductListQuery) {
  const { limit, skip, q, category } = query;

  const where = {
    ...(q
      ? {
          title: {
            contains: q,
            mode: "insensitive" as const,
          },
        }
      : {}),
    ...(category
      ? {
          category: {
            is: {
              name: {
                equals: category,
                mode: "insensitive" as const,
              },
            },
          },
        }
      : {}),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { id: "desc" },
      take: limit,
      skip,
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, limit, skip };
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

type ProductInput = {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
  category: string;
};

export async function createProduct(data: ProductInput) {
  return prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      thumbnail: data.thumbnail,
      stock: data.stock,
      category: {
        connectOrCreate: {
          where: { name: data.category },
          create: { name: data.category },
        },
      },
    },
    include: { category: true },
  });
}

export async function updateProduct(
  id: number,
  data: Partial<ProductInput>,
) {
  const { category, ...fields } = data;

  return prisma.product.update({
    where: { id },
    data: {
      ...fields,
      ...(category !== undefined
        ? {
            category: {
              connectOrCreate: {
                where: { name: category },
                create: { name: category },
              },
            },
          }
        : {}),
    },
    include: { category: true },
  });
}

export async function deleteProduct(id: number) {
  return prisma.product.delete({
    where: { id },
  });
}
