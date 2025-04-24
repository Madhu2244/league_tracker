"use client";

import { useActionState } from "react";
import { updateChampionNote } from "@/actions/champion_notes";
import { useToast } from "@/app/context/ToastContext";
import { useEffect } from "react";

type Props = {
  noteId: string;
  initialNotes: string;
};

export function GeneralNotesEditor({ noteId, initialNotes }: Props) {
  const { success, error } = useToast();
  const [state, dispatch, isPending] = useActionState<{ success: boolean, message: string }, FormData>(
    updateChampionNote,
    { success: false, message: "" }
  );

  useEffect(() => {
    if (state.message) {
      state.success ? success(state.message) : error(state.message);
    }
  }, [state, success, error]);

  return (
    <form action={dispatch} className="mb-6">
      <label htmlFor="notes" className="block font-semibold mb-2">
        General Notes
      </label>
      <textarea
        id="notes"
        name="notes"
        defaultValue={initialNotes}
        rows={6}
        className="w-full border rounded p-2 text-sm"
        disabled={isPending}
      />
      <input type="hidden" name="noteId" value={noteId} />
      <button
        type="submit"
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
