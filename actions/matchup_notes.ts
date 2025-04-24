"use server"

import { db } from "@/database/db"
import { matchupNotes } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache"

export async function queryMatchupNotes(championNoteId: string) {
  return db
    .select()
    .from(matchupNotes)
    .where(eq(matchupNotes.championNoteId, championNoteId));
}

export async function createMatchupNote(_: unknown, formData: FormData) {
  const noteId = formData.get("championNoteId");
  const enemyName = formData.get("enemyChampionName");

  if (typeof noteId !== "string" || typeof enemyName !== "string") {
    return { success: false, message: "Invalid data" };
  }

  await db.insert(matchupNotes).values({
    championNoteId: noteId,
    enemyChampionName: enemyName,
    notes: "",
  });

  revalidatePath(`/champion-notes/${noteId}`);

  return { success: true };
}

export async function updateMatchupNote(_: unknown, formData: FormData) {
  const matchupId = formData.get("matchupId") as string;
  const notes = formData.get("notes") as string;

  await db
    .update(matchupNotes)
    .set({
      notes,
      updatedAt: new Date(),
    })
    .where(eq(matchupNotes.id, matchupId));
  
  return { success: true };
}