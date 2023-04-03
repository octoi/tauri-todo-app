import { invoke } from "@tauri-apps/api";
import { TodoType } from "./todo.type";

export const createTodo = (title: string, assignedAt: number) => {
    return invoke('create_todo', {
        title,
        assigned_at: assignedAt.toString(),
        created_at: Date.now().toString()
    })
}

export const getTodos = () => {
    return invoke('read_todos');
}

export const updateTodo = (todo: TodoType) => {
    return invoke('update_todo', {
        id: todo.id,
        title: todo.title,
        done: todo.done,
        assigned_at: todo.assigned_at,
    })
}

export const deleteTodo = (id: number) => {
    return invoke('delete_todo', { id })
}
