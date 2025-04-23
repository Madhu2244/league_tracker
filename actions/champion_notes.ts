"use server"

import { db } from "@/database/db"
import { ChampionNote, championNotes } from "@/database/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function queryChampionNotes(userId: string) {
    const notes = await db.select()
      .from(championNotes)
      .where(eq(championNotes.userId, userId));
      
    return notes;
}

export async function createChampionNote(userId: string, championName: string) {
    const currentTime = new Date();
    const championNote: ChampionNote = {
        id: crypto.randomUUID(),
        userId: userId,
        championName: championName,
        createdAt: currentTime,
        updatedAt: currentTime,
        generalNotes: ""
    }
    await db.insert(championNotes).values(championNote);
    revalidatePath('/champion-notes');
}