"use server"

import { db } from "@/database/db"
import { championNotes } from "@/database/schema"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function queryChampionNotes(userId: string) {
    const notes = await db.select()
        .from(championNotes)
        .where(eq(championNotes.userId, userId))
        .orderBy(championNotes.championName);

    return notes;
}

export async function queryChampionNote(userId: string, championId: string) {
    let result = null
    if (championId.length < 12) {
        result = await db
            .select()
            .from(championNotes)
            .where(and(
                eq(championNotes.userId, userId),
                eq(championNotes.championName, championId)
            ))
            .limit(1)
            .execute();
    } else {
        result = await db
        .select()
        .from(championNotes)
        .where(and(
            eq(championNotes.userId, userId),
            eq(championNotes.id, championId)
        ))
        .limit(1)
        .execute();
    }
  
    return result[0] || null;
}

export async function createChampionNote(preivousState: unknown, formData: FormData) {
    const userId = formData.get("userId") as string;
    const championName = formData.get("championName") as string;
  
    if (!userId || !championName) {
        throw new Error("Missing required fields");
    }
  
    const currentTime = new Date();
    const championNote = {
        id: crypto.randomUUID(),
        userId,
        championName,
        createdAt: currentTime,
        updatedAt: currentTime,
        generalNotes: "",
    };
  
    await db.insert(championNotes).values(championNote);
    revalidatePath("/champion-notes");
    return { success: true };
}

export async function updateChampionNote(previousState: unknown, formData: FormData) {
    const noteId = formData.get("noteId") as string;
    const notes = formData.get("notes") as string;

    if (!noteId || !notes) {
      return { success: false, message: "Invalid form data" };
    }

    await db
      .update(championNotes)
      .set({ generalNotes: notes, updatedAt: new Date() })
      .where(eq(championNotes.id, noteId));

    revalidatePath("/champion-notes");

    return { success: true, message: "Notes updated successfully!" };
}

export async function deleteChampionNote(formData: FormData) {
    const noteId = formData.get("noteId") as string;
  
    if (!noteId) {
      throw new Error("Missing note ID");
    }
  
    await db.delete(championNotes).where(eq(championNotes.id, noteId)); // ✅ this is the fix
    revalidatePath("/champion-notes");
  
    return { success: true };
  }