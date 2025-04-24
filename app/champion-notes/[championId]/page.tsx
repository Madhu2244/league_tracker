import { queryChampionNote } from "@/actions/champion_notes";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GeneralNotesEditor } from "@/components/GeneralNotesEditor";
import { CreateNoteButton } from "@/components/CreateNoteButton";
import { queryMatchupNotes } from "@/actions/matchup_notes";
import { MatchupNoteItem } from "@/components/MatchupNoteItem";

export default async function ChampionNotePage({ params }: any) {
    const { championId } = await params;
    if (!championId) return notFound();
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/auth/sign-in");
    };
    const userId = session.user.id;
    const note = await queryChampionNote(userId, championId);
    if (!note) notFound();
    const matchupNotes = await queryMatchupNotes(note.id);
    console.log(matchupNotes)


    return (
        <main className="py-8 px-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">{note.championName}</h1>

                <GeneralNotesEditor
                    noteId={note.id}
                    initialNotes={note.generalNotes ?? ""}
                />

                <section className="mt-10">
                <h2 className="text-xl font-bold mb-4">Matchup Notes</h2>

                {matchupNotes.length === 0 ? (
                    <p className="text-sm text-gray-500 mb-4">No matchup notes yet.</p>
                ) : (
                    <ul className="space-y-2 mb-4">
                        {matchupNotes.map((matchup: any) => (
                            <MatchupNoteItem key={matchup.id} matchup={matchup} />
                        ))}
                    </ul>
                )}

                <CreateNoteButton
                    text="+ Create New Matchup Note"
                    route={`/create-matchup-note?noteId=${note.id}`}
                />
                </section>
            </div>
        </main>
    );
}