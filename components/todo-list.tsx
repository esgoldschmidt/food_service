import TodoItem from "./todo-item";

interface TodoListProps {
  handleEdit: ({ title, id }: { title: string; id: string }) => void;
}

const TodoList = ({ handleEdit }: TodoListProps) => {
  //  useEffect(() => {
  //    const fetchTodos = async () => {

  //     fetch todos

  //    };

  //    call fetchTodos

  //  }, []);

  const todos = [
    { title: "Drink Water", id: "1", isCompleted: false },
    { title: "Have some rest", id: "2", isCompleted: false },
    ,
    { title: "Take a walk", id: "3", isCompleted: true },
  ];
  return todos.length > 0 ? (
    <ul className="w-full rounded-sm border p-3 space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo?.id}
          title={todo?.title!}
          isCompleted={todo?.isCompleted!}
          id={todo?.id!}
          handleEdit={handleEdit}
        />
      ))}
    </ul>
  ) : (
    []
  );
};

export default TodoList;
