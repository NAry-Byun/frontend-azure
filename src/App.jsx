import { useState, useEffect } from 'react'
import './App.css'
import { todoApi } from './api/todoApi'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoApi.getAllTodos();
      if (response.success) {
        setTodos(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to connect to the server. Make sure the backend is running on localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    const response = await todoApi.createTodo(todoData);
    if (response.success) {
      setTodos([response.data, ...todos]);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    const response = await todoApi.updateTodo(id, todoData);
    if (response.success) {
      setTodos(todos.map(todo =>
        todo._id === id ? response.data : todo
      ));
    }
  };

  const handleDeleteTodo = async (id) => {
    const response = await todoApi.deleteTodo(id);
    if (response.success) {
      setTodos(todos.filter(todo => todo._id !== id));
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Todo App</h1>

        <TodoForm onAdd={handleAddTodo} />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <div className="todo-list">
            <h2>Todo List ({todos.length})</h2>
            {todos.length === 0 ? (
              <p className="empty-message">No todos yet. Add one above!</p>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
