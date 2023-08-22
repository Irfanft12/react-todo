import TodoItems from "./TodoItems"

export default function TodoList({todoList, onDeleteClick, onEditClick}) {
    return (
        <ul className="task-list">
           {todoList.map(item => {
            return (
                <TodoItems key={item.id} item={item} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
            )
           })}
        </ul>
    )
}