
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import Image from "next/image";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 12;

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&skip=${skip}`
        );

        if (!response.ok) {
          throw new Error("Erreur de chargement");
        }

        const data: ProductsResponse = await response.json();

        if (!cancelled) {
          setProducts(data.products);
          setTotal(data.total);
        }
      } catch {
        if (!cancelled) {
          setError("Impossible de charger les produits. Réessayez.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [skip]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Notre catalogue de produits
      </h1>

      {loading ? (
        <p className="py-10 text-center">Chargement des produits...</p>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="h-48 w-full bg-white object-contain p-4"
                />

                <div className="flex flex-1 flex-col p-4">
                  <h2 className="mb-2 text-lg font-semibold">
                    {product.title}
                  </h2>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {product.description}
                  </p>

                  <p className="mb-4 mt-auto text-xl font-bold text-blue-700">
                    {product.price} $
                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                  >
                    Voir les détails
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={() => setSkip((value) => Math.max(0, value - limit))}
              disabled={skip === 0}
              className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Précédent
            </button>

            <span>
              Page {Math.floor(skip / limit) + 1}
            </span>

            <button
              onClick={() => setSkip((value) => value + limit)}
              disabled={skip + limit >= total}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </main>
  );
}
