"use client";

import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createChampionNote } from "@/actions/champion_notes";

export default function ChampionSelector({
  champions,
  userId,
  existingNotes,
}: {
  champions: any[];
  userId: string;
  existingNotes: { championName: string }[]; // adjust type if needed
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const notedChampionNames = new Set(existingNotes.map((note) => note.championName));

  const createNote = async (_: unknown, formData: FormData) => {
    const result = await createChampionNote(undefined, formData);
    if (result.success) {
      router.push("/champion-notes");
    }
    return result;
  };

  const [_, dispatch, isPending] = useActionState(createNote, null);

  return (
    <form action={dispatch}>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="championName" value={selected ?? ""} />

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-4">
        {champions.map((champ) => {
          const isAlreadyNoted = notedChampionNames.has(champ.name); // or champ.id if consistent
          return (
            <button
              type="button"
              key={champ.id}
              onClick={() => !isAlreadyNoted && setSelected(champ.id)}
              disabled={isAlreadyNoted}
              className={`flex flex-col items-center p-2 rounded border ${
                selected === champ.id ? "border-blue-500 ring-2 ring-blue-400" : "border-transparent"
              } ${isAlreadyNoted ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champ.id}.png`}
                alt={champ.name}
                className="w-16 h-16"
              />
              <span className="text-xs mt-1 text-center">{champ.name}</span>
            </button>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={!selected || isPending}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Confirm
      </button>
    </form>
  );
}
