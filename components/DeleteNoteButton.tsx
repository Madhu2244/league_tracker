"use client";

import { useActionState } from "react";
import { deleteChampionNote } from "@/actions/champion_notes";

export function DeleteNoteButton({ noteId }: { noteId: string }) {
  const deleteNote = async (_: unknown, formData: FormData) => {
    return await deleteChampionNote(formData);
  };

  const [_, dispatch, isPending] = useActionState(deleteNote, null);

  return (
    <form action={dispatch}>
      <input type="hidden" name="noteId" value={noteId} />
      <button
        type="submit"
        disabled={isPending}
        className="text-red-600 hover:underline text-sm ml-4"
      >
        Delete
      </button>
    </form>
  );
}
