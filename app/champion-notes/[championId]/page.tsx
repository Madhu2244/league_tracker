import { queryChampionNote } from "@/actions/champion_notes";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GeneralNotesEditor } from "@/components/GeneralNotesEditor";

export default async function ChampionNotePage({ params }: { params: { championId: Promise<string> } }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/sign-in");
    }
    const userId = session.user.id;
    const championId = await params?.championId;
    if (!championId) notFound();

    const note = await queryChampionNote(userId, championId);
    if (!note) notFound();

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
                    <p className="text-sm text-gray-500 mb-4">No matchup notes yet.</p>
                    <form
                        action={async () => {
                        "use server";
                        console.log("TODO: Create matchup note");
                        }}
                    >
                        <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Create Matchup Note
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}