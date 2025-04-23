"use client";

import { useRouter } from "next/navigation";

export function CreateNoteButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/create-champion-note')}
      className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      + Create New Champion Note
    </button>
  );
}
