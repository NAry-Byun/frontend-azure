import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    try {
      await onAdd({
        title: title.trim(),
        description: description.trim()
      });

      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add todo:', error);
      alert('Failed to add todo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>Add New Todo</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        className="form-input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description (optional)"
        className="form-textarea"
        rows="3"
      />
      <button type="submit" className="btn btn-primary">Add Todo</button>
    </form>
  );
}

export default TodoForm;
