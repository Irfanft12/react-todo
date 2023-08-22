import { useState } from "react"

export default function TodoItems({item, onDeleteClick, onEditClick}) {
    const [isEditing, setIsEditing] = useState(false)

    return (       
        <li>
         {!isEditing ? (
            <div>
               <span className={item.completed ? "completed todo" : "todo"}>{item.todo}</span>
               <div className="btns-wrapper">
               <input className="checkbox" type="checkbox" name="" id="" onChange={(e) => onEditClick({
                    ...item,
                    completed: e.target.checked
                })} />
                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="delete-btn" onClick={() => onDeleteClick(item.id)}>Delete</button>
               </div>
            </div>
            ) : (
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setIsEditing(false)
                }}>
                    <input type="text" value={item.todo} onChange={(e) => onEditClick({
                        ...item,
                        todo: e.target.value
                    })} />
                    <button className="save-btn">Save</button>
                </form>
            )}
            
        </li>
    )
}