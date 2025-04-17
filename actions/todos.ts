"use server"

import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import { db } from "@/database/db"
import { todos, Todo } from "@/database/schema"
import { Session } from "better-auth"


export async function createTodo(previousState: unknown, formData: FormData) {
    const title = formData.get("title") as string
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (session !== null && title.length > 0) {
        const currentTime = new Date();

        const todo: Todo = {
            title: title,
            completed: false,
            createdAt: currentTime,
            updatedAt: currentTime,
            userId: session.user.id,
        }

        await db.insert(todos).values(todo);
        revalidatePath('/todo')
        return { message: "Todo saved", }
    }
    return { error: "Todo not saved" }
}

export async function toggleTodo(todoId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session !== null) {
        const todo = await db.query.todos.findFirst({
            where: eq(todos.id, todoId),
        });

        if (!todo || todo.userId !== session.user.id) {
            return { error: "Unauthorized or Todo not found" };
        }

        await db.update(todos)
        .set({ completed: !todo.completed, updatedAt: new Date() })
        .where(eq(todos.id, todoId));

        revalidatePath('/todo');
        return { message: "Todo updated" };
    }
    return { error: "Unauthorized" }

}

export async function queryTodo(session: any) {
    const todoList = await db.select()
        .from(todos)
        .where(eq(todos.userId, session.user.id));
    
    return todoList;
}

export async function deleteTodo(formData: FormData) {
    /* YOUR AUTHORIZATION CHECK HERE */
    const id = formData.get("id") as string;
    await db.delete(todos)
        .where(eq(todos.id, id));

    revalidatePath("/admin");
}
