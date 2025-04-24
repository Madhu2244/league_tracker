import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { queryChampionNotes } from "@/actions/champion_notes";
import { MatchupSelector } from "@/components/MatchupSelector";

export default async function CreateMatchupNotePage({ searchParams }: { searchParams: { noteId?: string , championName?: string} }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/sign-in");

  const championNoteId = searchParams.noteId;
  if (!championNoteId) redirect("/champion-notes"); // fallback just in case
  // Fetch champion list
  const res = await fetch("https://ddragon.leagueoflegends.com/cdn/15.8.1/data/en_US/champion.json");
  const data = await res.json();
  const champions = Object.values(data.data);

  return (
    <main className="py-8 px-4">
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Select an Enemy Champion</h1>
        <MatchupSelector
          champions={champions}
          championNoteId={championNoteId}
        />
      </section>
    </main>
  );
}
