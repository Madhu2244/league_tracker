import { TodoList } from "@/components/TodoList"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { queryTodo } from "@/actions/todos"
import { redirect } from "next/navigation";

export default async function TodosPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/auth/sign-in");
    }

    const todos = await queryTodo(session) ?? [];

    return (
        <main className="py-8 px-4">
            <section className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">My Todos</h1>
                <TodoList todos={todos} />
            </section>
        </main>
    )
} 