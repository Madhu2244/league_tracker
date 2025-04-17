import { TodoList } from "@/components/TodoList"
import { todos as todosTable, Todo } from "@/database/schema"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { queryTodo } from "@/actions/todos"

export default async function TodosPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const todos = await queryTodo(session);

    return (
        session !== null ? (
            <main className="py-8 px-4">
                <section className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-6">My Todos</h1>
                    <TodoList todos={todos} />
                </section>
            </main>
        ) : (
            <p>Please log in.</p>
        )
    )
} 