import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MatchupSelector } from "@/components/MatchupSelector";

export default async function CreateMatchupNotePage({ params }: any) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/sign-in");

  const championNoteId = params.championId;
  if (!championNoteId) redirect("/champion-notes");

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
