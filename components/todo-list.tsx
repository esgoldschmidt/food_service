import { useEffect, useState } from "react";
import { formatDate } from "../lib/format-date";
import TodoItem from "./todo-item";
import toast from "react-hot-toast";

interface TodoListProps {
  handleEdit: ({ title, id }: { title: string; id: string }) => void;
}

interface Todo {
  title: string;
  id: string;
  isCompleted: boolean;
  updatedAt: string | Date;
}

const TodoList = ({ handleEdit }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]); // ✅ using todos, not todo

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`/api/todo`, {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status}`);
        }

        const data = await response.json();
        setTodos(data); // ✅ update the todos state
      } catch (error: any) {
        console.error(`Error fetching items: ${error.message}`);
        toast.error("Unable to fetch todos at this time");
      }
    };

    fetchTodos();
  }, []);

  return todos.length > 0 ? (
    <ul className="w-full rounded-sm border p-3 space-y-2">
      {todos.map((todo) => {
        const updatedDate = formatDate(new Date(todo.updatedAt));
        return (
          <TodoItem
            key={todo.id}
            title={todo.title}
            isCompleted={todo.isCompleted}
            id={todo.id}
            updatedAt={updatedDate}
            handleEdit={handleEdit}
          />
        );
      })}
    </ul>
  ) : (
    <div className="text-gray-500 text-center py-4">No todos yet.</div>
  );
};

export default TodoList;