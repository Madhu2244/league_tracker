import { db } from "@/database/db"
import { matchupNotes } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function queryMatchupNotes(championNoteId: string) {
  return await db
    .select()
    .from(matchupNotes)
    .where(eq(matchupNotes.championNoteId, championNoteId))
    .execute();
}

export async function updateMatchupNote(noteId: string, updates: { enemyChampionName?: string; notes?: string }) {
  await db
    .update(matchupNotes)
    .set({ 
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(matchupNotes.id, noteId));
}
