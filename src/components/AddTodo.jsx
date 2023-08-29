export default function AddTodo({onTodoNameChange, todoName, onAddTodoSubmit, showError}) {
    return (
        <>
        <form onSubmit={onAddTodoSubmit} className="add-task-form">
            <div className="form-inner">
                <div className="task-input-wrapper">
                    <label>Add New Todo</label>
                    <input className="task-input" type="text" value={todoName} placeholder="Add todo" onChange={onTodoNameChange} />
                </div>         
                <button className="submit-btn">Add</button>
            </div>            
            {showError && <p className="error">Type something in the box above!</p>}
        </form>
        </>
        
    )
}