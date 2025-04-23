"use client";

import { createChampionNote } from "@/actions/champion_notes";
import { useState } from "react";

export default function ChampionSelector({ champions, userId }: { champions: any[]; userId: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selected) return;
    setSubmitting(true);
    console.log(userId, selected);
    await createChampionNote(userId, selected);
    setSubmitting(false);
  };

  return (
    <div>
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-4">
        {champions.map((champ: any) => (
          <button
            key={champ.id}
            onClick={() => setSelected(champ.id)}
            className={`flex flex-col items-center p-2 rounded border ${
              selected === champ.id ? "border-blue-500 ring-2 ring-blue-400" : "border-transparent"
            }`}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champ.id}.png`}
              alt={champ.name}
              className="w-16 h-16"
            />
            <span className="text-xs mt-1 text-center">{champ.name}</span>
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selected || submitting}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Confirm
      </button>
    </div>
  );
}
