import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";
import { queryChampionNotes } from "@/actions/champion_notes";
import { CreateNoteButton } from "@/components/CreateNoteButton";

export default async function ChampionNotesPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/auth/sign-in");
    }

    const championNotes = await queryChampionNotes(session.user.id) ?? [];

    return (
        <main className="py-8 px-4">
            <section className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">My Champion Notes</h1>

                {championNotes.length === 0 ? (
                <p className="mb-4">You have no champion notes yet.</p>
                ) : (
                <ul className="space-y-2">
                    {championNotes.map(note => (
                    <li key={note.id} className="border p-4 rounded shadow-sm">
                        <h2 className="font-semibold">{note.championName}</h2>
                        <p className="text-sm text-gray-600">{note.generalNotes}</p>
                    </li>
                    ))}
                </ul>
                )}
                <CreateNoteButton />
            </section>
        </main>
    )
} 