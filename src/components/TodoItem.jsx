import { useState } from 'react';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleUpdate = async () => {
    try {
      await onUpdate(todo._id, {
        title: editTitle,
        description: editDescription,
        completed: todo.completed
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Failed to update todo');
    }
  };

  const handleToggleComplete = async () => {
    try {
      await onUpdate(todo._id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed
      });
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      alert('Failed to toggle todo');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await onDelete(todo._id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
        alert('Failed to delete todo');
      }
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-input"
          placeholder="Title"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="edit-textarea"
          placeholder="Description"
          rows="3"
        />
        <div className="edit-buttons">
          <button onClick={handleUpdate} className="btn btn-save">Save</button>
          <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <h3>{todo.title}</h3>
          {todo.description && <p>{todo.description}</p>}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="btn btn-edit">Edit</button>
        <button onClick={handleDelete} className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
