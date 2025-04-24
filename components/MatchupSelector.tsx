"use client";

import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createMatchupNote } from "@/actions/matchup_notes"; // you'll need to make this action

export function MatchupSelector({
  champions,
  championNoteId,
}: {
  champions: any[];
  championNoteId: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const createNote = async (_: unknown, formData: FormData) => {
    const result = await createMatchupNote(undefined, formData);
    if (result.success) {
      router.push(`/champion-notes/${championNoteId}`);
    }
    return result;
  };

  const [_, dispatch, isPending] = useActionState(createNote, null);

  return (
    <form action={dispatch}>
      <input type="hidden" name="championNoteId" value={championNoteId} />
      <input type="hidden" name="enemyChampionName" value={selected ?? ""} />

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-4">
        {champions.map((champ) => (
          <button
            type="button"
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
        type="submit"
        disabled={!selected || isPending}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Confirm"}
      </button>
    </form>
  );
}
