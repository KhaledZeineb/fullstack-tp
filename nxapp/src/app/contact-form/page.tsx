
"use client";

import { useState } from "react";

export default function ContactFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Nom :", name);
    console.log("Email :", email);
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Formulaire de contact
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">
            Nom :
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="rounded border p-2"
          />
        </div>

        
        <div>
          <label htmlFor="email" className="block">
            Adresse e-mail :
          </label>
        
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => {}}
            required
            className="rounded border p-2"
          />

          {email !== "" && !isEmailValid && (
            <p className="mt-1 text-red-600">
              Veuillez saisir une adresse e-mail valide.
            </p>
         )}
        </div>


        <button
          type="submit"
          disabled={!name.trim() || !isEmailValid}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
        Envoyer
        </button>

      </form>
    </main>
  );
}
