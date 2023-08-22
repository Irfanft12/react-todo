export default function AddTodo({onTodoNameChange, todoName, onAddTodoSubmit}) {
    return (
        <form onSubmit={onAddTodoSubmit} className="add-task-form ">
            <div className="task-input-wrapper">
                <label>Add New Todo</label>
                <input className="task-input" type="text" value={todoName} placeholder="Add todo" onChange={onTodoNameChange} />
            </div>         
            <button className="submit-btn">Add</button>
        </form>
    )
}