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

export async function createMatchupNote(previousState: unknown, formData: FormData) {
    const championNoteId = formData.get("championNoteId") as string;
    const enemyChampionName = formData.get("enemyChampionName") as string;

    if (!championNoteId || !enemyChampionName) {
        throw new Error("Missing required fields");
    }
    // championNoteId: string, enemyChampionName: string
    
    const currentTime = new Date();
    const matchupNote = {
        id: crypto.randomUUID(),
        championNoteId: championNoteId,
        enemyChampionName: enemyChampionName,
        notes: "",
        createdAt: currentTime,
        updatedAt: currentTime
    }

    await db.insert(matchupNotes).values(matchupNote);
    // revalidatePath("/champion-notes")
    return { success: true };
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
