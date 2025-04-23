// "use client"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// import { Todo } from "@/database/schema"

// import { TodoItem } from "./TodoItem"

// import { createTodo } from "@/actions/todos"
// import { useActionState, useOptimistic } from 'react'

// export function TodoList({ todos }: { todos: Todo[] }) {
//     const [data, action, isPending] = useActionState(createTodo, undefined);
//     const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (currentState, newTitle: string) => [
//         ...currentState,
//         {
//             id: crypto.randomUUID(),
//             title: newTitle,
//             completed: false,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             userId: 'optimistic',
//         } as Todo,
//     ]);

//     async function handleAddTodo(formData: FormData) {
//         const title = formData.get("title") as string;
//         if (title) {
//             setOptimisticTodos(title);
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             action(formData);
//         }
//     }

//     return (
//         <div className="space-y-4">
//             <form className="flex gap-2 items-stretch" action={handleAddTodo}>
//                 <Input
//                     name="title"
//                     placeholder={"Add a new todo..."}
//                 />
//                 <Button type="submit" disabled={isPending}>
//                     Add
//                 </Button>
//                 {data?.error && <span style={{ color: "red" }}>{data?.error}</span>}
//                 {data?.message && <span style={{ color: "green" }}>{data?.message}</span>}
//             </form>


//             <ul className="space-y-2">
//                 {optimisticTodos.map((todo) => (
//                     <TodoItem key={todo.id} todo={todo} />
//                 ))}
//             </ul>
//         </div>
//     )
// } 