import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (!savedTodos) {
      return [];
    } else {
      return JSON.parse(savedTodos);
    }
  });
  const [todoName, setTodoName] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  function handleTodoNameChange(e) {
    setTodoName(e.target.value);
    setShowError(false);
  }

  function handleAddTodoSubmit(e) {
    e.preventDefault();
    if (todoName.trim()) {
      setTodoList([
        { id: uuidv4(), todo: todoName, completed: false },
        ...todoList,
      ]);
      setTodoName("");
    } else {
      setShowError(true);
    }
  }

  function handleEditClick(updatedTodo) {
    const newTodoList = todoList.map((t) => {
      if (t.id === updatedTodo.id) {
        return updatedTodo;
      } else {
        return t;
      }
    });

    setTodoList(newTodoList);
  }

  function handleDeleteClick(item) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure?",
      html: `<p>You won't be able to revert <b>${item.todo}</b>!</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodoList = todoList.filter((t) => {
          return t.id !== item.id;
        });
        setTodoList(newTodoList);
        Swal.fire({
         title: "Deleted!",
         html: `<p><b>${item.todo}</b> has been deleted.</p>`,
         icon: "success"
        });
      }
    });
  }

  return (
    <main>
      <AddTodo
        todoName={todoName}
        onTodoNameChange={handleTodoNameChange}
        onAddTodoSubmit={handleAddTodoSubmit}
        showError={showError}
      />
      <hr className="devider" />
      <TodoList
        todoList={todoList}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
      />
    </main>
  );
}
