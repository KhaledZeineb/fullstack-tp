
import Link from "next/link";
import type { Product } from "@/types/product";
import Image from "next/image";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
  );

  if (!response.ok) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <Link href="/products" className="mt-4 inline-block text-blue-600 underline">
          Retour au catalogue
        </Link>
      </main>
    );
  }

  const product: Product = await response.json();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/products"
        className="mb-6 inline-block rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        ← Retour au catalogue
      </Link>

      <article className="grid gap-8 rounded-xl border p-6 shadow-sm md:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={400}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div>
          <h1 className="mb-3 text-3xl font-bold">{product.title}</h1>

          <p className="mb-4 text-sm text-gray-500">
            Catégorie : {product.category}
          </p>

          <p className="mb-6 leading-7 text-gray-700">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-blue-700">
            {product.price} $
          </p>
        </div>
      </article>
    </main>
  );
}
