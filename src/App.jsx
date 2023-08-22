import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid"
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function App() {
  
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("todos"))
  })
  const [todoName, setTodoName] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  })
  
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
    const newTodoList = todoList.filter(t => {
      return t.id !== id
    })
    setTodoList(newTodoList)
  }

  return (
    <main>
      <AddTodo todoName={todoName} onTodoNameChange={handleTodoNameChange} onAddTodoSubmit={handleAddTodoSubmit} />
      <hr className="devider" />
      <TodoList todoList={todoList} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
    </main>
  )
}