import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { users } from "./auth"
import { relations } from "drizzle-orm"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"
import { z } from "zod"


export const championNotes = pgTable("champion_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  championName: text("champion_name").notNull(),
  generalNotes: text("general_notes").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const matchupNotes = pgTable("matchup_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  championNoteId: uuid("champion_note_id")
    .notNull()
    .references(() => championNotes.id, { onDelete: "cascade" }),
  enemyChampionName: text("enemy_champion_name").notNull(),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  championNotes: many(championNotes),
}))

export const championNotesRelations = relations(championNotes, ({ one, many }) => ({
  user: one(users, {
    fields: [championNotes.userId],
    references: [users.id],
  }),
  matchupNotes: many(matchupNotes),
}))

export const matchupNotesRelations = relations(matchupNotes, ({ one }) => ({
  championNote: one(championNotes, {
    fields: [matchupNotes.championNoteId],
    references: [championNotes.id],
  }),
}))


// Zod Schemas
export const selectUserSchema = createSelectSchema(users)
export type User = z.infer<typeof selectUserSchema>

export const selectChampionNoteSchema = createSelectSchema(championNotes)
export type ChampionNote = z.infer<typeof selectChampionNoteSchema>

export const insertChampionNoteSchema = createInsertSchema(championNotes, {
  championName: (schema) => schema.min(1, "Champion name cannot be empty"),
  generalNotes: (schema) => schema.optional(),
})
export type NewChampionNote = z.infer<typeof insertChampionNoteSchema>

export const selectMatchupNoteSchema = createSelectSchema(matchupNotes)
export type MatchupNote = z.infer<typeof selectMatchupNoteSchema>

export const insertMatchupNoteSchema = createInsertSchema(matchupNotes, {
  enemyChampionName: (schema) => schema.min(1, "Enemy champion name cannot be empty"),
  notes: (schema) => schema.optional(),
})
export type NewMatchupNote = z.infer<typeof insertMatchupNoteSchema>

export default {
  users,
  championNotes,
  matchupNotes,
}