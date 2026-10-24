
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Child from "@/components/Child";

export default function Home() {
  const router = useRouter();

  const [states, setStates] = useState(["Tozeur", "Gafsa", "Tunis"]);
  const [chosen, setChosen] = useState("");
  const [newState, setNewState] = useState("");

  function addState() {
    const value = newState.trim();

    if (value && !states.includes(value)) {
      setStates([...states, value]);
    }

    setNewState("");
  }

  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
          onClick={() => router.push("/login")}
        >
          Login Page
        </button>

        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white"
          onClick={() => router.push("/contact")}
        >
          Contact Page
        </button>

        <button
          className="rounded bg-gray-500 px-4 py-2 font-bold text-white"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>

      <h1 className="mt-6 text-xl font-bold">Parent Component</h1>

      <div className="my-4 flex gap-2">
        <input
          type="text"
          placeholder="Entrez une ville"
          value={newState}
          onChange={(e) => setNewState(e.target.value)}
          className="rounded border px-3 py-2"
        />

        <button
          onClick={addState}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Ajouter
        </button>
      </div>

      <Child states={states} onSelect={setChosen} />

      <p className="mt-4">Selected: {chosen}</p>
    </main>
  );
}
