import { invoke } from '@tauri-apps/api';
import { TodoType } from './todo.type';

export const addTodo = (title: string, assignedAt: number) => {
  return invoke('add_todo', {
    title,
    assignedAt: assignedAt.toString(),
    createdAt: Date.now().toString(),
  });
};

export const getTodos = () => {
  return invoke('read_todos');
};

export const updateTodo = (todo: TodoType) => {
  return invoke('update_todo', {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    assigned_at: todo.assigned_at,
  });
};

export const deleteTodo = (id: number) => {
  return invoke('delete_todo', { id });
};
