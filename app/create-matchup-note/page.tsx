import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// import ChampionSelector from "@/components/ChampionSelector";
import { queryChampionNotes } from "@/actions/champion_notes";

export default async function CreateMatchupNotePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  // Fetch champion list server-side
  const res = await fetch("https://ddragon.leagueoflegends.com/cdn/15.8.1/data/en_US/champion.json");
  const data = await res.json();
  const champions = Object.values(data.data);
  const championNotes = await queryChampionNotes(session.user.id);

  return (
    <main className="py-8 px-4">
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Select a Champion</h1>
        {/* <ChampionSelector champions={champions} userId={session.user.id} existingNotes={championNotes} /> */}
      </section>
    </main>
  );
}