"use client";

import { useState } from "react";
import { useActionState } from "react";
import { updateMatchupNote } from "@/actions/matchup_notes";

export function MatchupNoteItem({ matchup: initialMatchup }: { matchup: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [matchup, setMatchup] = useState(initialMatchup);
  const [state, dispatch, isPending] = useActionState(
    async (prevState: any, formData: any) => {
      const optimisticNotes = formData.get("notes") as string;
      setMatchup((prev: any) => ({ ...prev, notes: optimisticNotes }));
      const result = await updateMatchupNote(null, formData);
      if (!result?.success) {
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
    <li className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-sm text-gray-100">
      {isEditing ? (
        <form
          action={dispatch}
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <input type="hidden" name="matchupId" value={matchup.id} />
          <label className="font-semibold text-gray-200">
            {matchup.enemyChampionName}
          </label>
          <textarea
            name="notes"
            defaultValue={matchup.notes}
            rows={3}
            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="text-gray-400 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-start">
          <span className="text-gray-200 leading-relaxed">
            <strong className="text-white">{matchup.enemyChampionName}</strong> —{" "}
            {matchup.notes || <em className="text-gray-400">No notes yet.</em>}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:underline ml-4 text-sm"
          >
            Edit
          </button>
        </div>
      )}
    </li>
  );
}
