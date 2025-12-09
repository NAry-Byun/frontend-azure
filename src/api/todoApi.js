import axios from 'axios';

const API_BASE_URL = 'https://nary-todo-api-2025-ebcubah8bfergkbf.eastasia-01.azurewebsites.net/api/todos';

export const todoApi = {
  // Get all todos
  getAllTodos: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      console.log('GET all todos response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get a single todo by ID
  getTodoById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      console.log('GET todo by ID response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo by ID:', error.response?.data || error.message);
      throw error;
    }
  },

  // Create a new todo
  createTodo: async (todoData) => {
    try {
      console.log('Creating todo with data:', todoData);
      const response = await axios.post(API_BASE_URL, todoData);
      console.log('POST todo response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update a todo
  updateTodo: async (id, todoData) => {
    try {
      console.log('Updating todo:', id, todoData);
      const response = await axios.put(`${API_BASE_URL}/${id}`, todoData);
      console.log('PUT todo response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      console.log('Deleting todo:', id);
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      console.log('DELETE todo response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting todo:', error.response?.data || error.message);
      throw error;
    }
  }
};
