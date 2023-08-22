import { FaTrash, FaPencil } from "react-icons/fa6";

export default function TaskList({
  taskList,
  onTaskDelete,
  onTaskUpdate,
  editTask,
  onEditTask,
}) {
  return (
    <div>
      <h2 className="task-list-title">Task List</h2>
      <ul className="task-list">
        {taskList.map((item) => {
          return (
            <li key={item.id}>
              {editTask ? (
                <div>
                  <form onSubmit={onEditTask}>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        onTaskUpdate({ ...item, name: e.target.value })
                      }
                    />
                    <button>Save</button>
                  </form>
                </div>
              ) : (
                <div>
                  <span className={item.completed ? "completed" : ""}>
                    {item.name}
                  </span>
                  <div className="btns-wrapper">
                    <input
                      className="checkbox"
                      defaultChecked={item.completed}
                      type="checkbox"
                      name=""
                      id=""
                      onChange={(e) =>
                        onTaskUpdate({
                          ...item,
                          completed: e.target.checked,
                        })
                      }
                    />
                    <button className="edit-btn" onClick={onEditTask}>
                      <FaPencil />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => onTaskDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
