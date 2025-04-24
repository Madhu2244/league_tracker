"use client";

import { useState } from "react";
import { useActionState } from "react";
import { updateMatchupNote } from "@/actions/matchup_notes";

export function MatchupNoteItem({ matchup: initialMatchup }: { matchup: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [matchup, setMatchup] = useState(initialMatchup);
  const [state, dispatch, isPending] = useActionState(
    async (prevState, formData) => {
      const optimisticNotes = formData.get("notes") as string;
      setMatchup((prev) => ({ ...prev, notes: optimisticNotes })); // Optimistic update
      const result = await updateMatchupNote(null, formData);
      if (!result?.success) {
        // Revert on error (you'd need to handle error display too)
        setMatchup(initialMatchup);
      }
      return result;
    },
    null
  );

  const handleSubmit = () => {
    setIsEditing(false);
  };

  return (
    <li className="text-sm flex flex-col gap-1 border-t pt-4">
      {isEditing ? (
        <form
          action={dispatch}
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <input type="hidden" name="matchupId" value={matchup.id} />
          <label className="font-semibold">{matchup.enemyChampionName}</label>
          <textarea
            name="notes"
            defaultValue={matchup.notes}
            rows={3}
            className="w-full border rounded p-2 text-sm"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-start">
          <span className="text-gray-800">
            <strong>{matchup.enemyChampionName}</strong> — {matchup.notes || "No notes yet."}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline ml-4 text-sm"
          >
            Edit
          </button>
        </div>
      )}
    </li>
  );
}