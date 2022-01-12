export interface Todo {
  id: number | string;
  title: string;
  isComplete?: boolean;
}

export function createTodo(params: Partial<Todo>) {
  return {
    title: params.title,
    isComplete: false
  } as Todo;
}
