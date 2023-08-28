import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todos")

    if (!savedTodos) {
      return []
    } else {      
      return JSON.parse(savedTodos)
    }
  })

  const [todoName, setTodoName] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])
  
  function handleTodoNameChange(e) {
    setTodoName(e.target.value)
  }

  function handleAddTodoSubmit(e) {
    e.preventDefault()
    if (todoName.trim()) {
      setTodoList([
        {id: uuidv4(), todo: todoName, completed: false},
        ...todoList
      ])
      setTodoName("")
    }
  }

  function handleEditClick(updatedTodo) {
    const newTodoList = todoList.map(t => {
      if (t.id === updatedTodo.id) {
        return updatedTodo
      } else {
        return t
      }
    })

    setTodoList(newTodoList)
  }

  function handleDeleteClick(id) {
    const MySwal = withReactContent(Swal)

  MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      const newTodoList = todoList.filter(t => {
        return t.id !== id
      })
      setTodoList(newTodoList)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
    
  }

  return (
    <main>
      <AddTodo todoName={todoName} onTodoNameChange={handleTodoNameChange} onAddTodoSubmit={handleAddTodoSubmit} />
      <hr className="devider" />
      <TodoList todoList={todoList} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
    </main>
  )
}