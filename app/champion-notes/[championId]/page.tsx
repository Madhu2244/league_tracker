import { queryChampionNote } from "@/actions/champion_notes";
import { notFound } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { GeneralNotesEditor } from "@/components/GeneralNotesEditor";

export default async function ChampionNotePage({ params }: { params: { championId: string } }) {
  const session = await useAuth();
  const userId = session.user.id;
  const { championId } = await params;

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

        {/* Matchup Notes Section */}
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
