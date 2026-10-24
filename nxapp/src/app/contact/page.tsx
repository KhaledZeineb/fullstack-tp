
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <main>
      <h1>Contact Page</h1>
      <p>Contact Reference: {ref}</p>
    </main>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ContactContent />
    </Suspense>
  );
}
