import { queryChampionNotes } from "@/actions/champion_notes";
import { CreateNoteButton } from "@/components/CreateNoteButton";
import { DeleteNoteButton } from "@/components/DeleteNoteButton";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default async function ChampionNotesPage() {
    const session = await useAuth();

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
                            <li key={note.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
                                <div>
                                    <Link href={`/champion-notes/${note.championName}`} passHref>
                                        <h2 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                                            {note.championName}
                                        </h2>
                                    </Link>
                                    <p className="text-sm text-gray-600">{note.generalNotes}</p>
                                </div>
                                <DeleteNoteButton noteId={note.id} />
                            </li>
                        ))}
                    </ul>
                )}
                <CreateNoteButton />
            </section>
        </main>
    );
}
