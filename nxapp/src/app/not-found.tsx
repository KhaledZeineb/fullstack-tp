
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold">404 - Page introuvable</h1>
      <p className="my-4">La page demandée n'existe pas.</p>
      <Link href="/" className="text-blue-600 underline">
        Retour à l'accueil
      </Link>
    </main>
  );
}
