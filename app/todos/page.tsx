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

    const templateTodos: Todo[] = [
        {
            id: "qwerty",
            title: "Read React docs",
            completed: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: "SgcYNcEgbMxGZ1EnuCLYgf6OGac3UIOQ"
        },
        {
            id: "uiop[]",
            title: "Read Next.js docs",
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: "SgcYNcEgbMxGZ1EnuCLYgf6OGac3UIOQ"
        },
        {
            id: "abcdefg",
            title: "Finish CS 5356 homework",
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: "SgcYNcEgbMxGZ1EnuCLYgf6OGac3UIOQ"
        }
    ]

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