import Link from "next/link"
import { UserButton } from "@daveyplate/better-auth-ui"
import { Button } from "./ui/button"
import { AdminNavEntry } from "./AdminNavEntry"
import { authenticateAdmin } from "@/actions/todos"

export async function Header() {

    const isAdmin = await authenticateAdmin();

    return (
        <header className="sticky top-0 z-50 px-4 py-3 border-b bg-background/60 backdrop-blur">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        CS 5356 – HW 6
                    </Link>
                    <nav className="flex items-center gap-2">
                        <Link href="/champion-notes">
                            <Button variant="ghost">Todos</Button>
                        </Link>
                        {isAdmin && <AdminNavEntry />}
                    </nav>
                </div>

                <UserButton />
            </div>
        </header>
    )
}
