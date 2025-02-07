import React, { useEffect, useState } from "react";
import { fetchTodos } from "./api"; // Import the API function
import axios from "axios";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(""); // For adding new todo
    const [editTodoId, setEditTodoId] = useState(null); // To store the id of the todo being edited
    const [editTodoTitle, setEditTodoTitle] = useState(""); // To store the title while editing

    // Fetch todos when the component mounts
    useEffect(() => {
        const loadTodos = async () => {
            const data = await fetchTodos();
            setTodos(data);
        };
        loadTodos();
    }, []);

    // Handle adding a new todo
    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            const newTodoObject = { id: Date.now(), title: newTodo };
            setTodos([...todos, newTodoObject]);
            setNewTodo(""); // Reset input field after adding
        }
    };

    // Handle updating a todo
    const handleUpdateTodo = async () => {
        if (editTodoTitle.trim()) {
            await axios.put(`https://localhost:7034/api/todo/${editTodoId}`, {
                id: editTodoId, // Add this
                title: editTodoTitle,
                isCompleted: todos.find(todo => todo.id === editTodoId)?.isCompleted || false, // Ensure isCompleted is included
            });

            // Update UI optimistically
            const updatedTodos = todos.map(todo =>
                todo.id === editTodoId ? { ...todo, title: editTodoTitle } : todo
            );
            setTodos(updatedTodos);
            setEditTodoId(null);
            setEditTodoTitle("");
        }
    };

    // Handle deleting a todo
    const handleDeleteTodo = async (id) => {
        // Make the API call to delete the todo (if required)
        await axios.delete(`https://localhost:7034/api/todo/${id}`);

        // Optimistically update the UI by removing the todo
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1>Todo List</h1>

            {/* Input field for adding new todos */}
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button>

            {/* Render the list of todos */}
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <li key={todo.id}>
                            {editTodoId === todo.id ? (
                                // Display the edit input when editing
                                <div>
                                    <input
                                        type="text"
                                        value={editTodoTitle}
                                        onChange={(e) => setEditTodoTitle(e.target.value)}
                                    />
                                    <button onClick={handleUpdateTodo}>Update</button>
                                    <button onClick={() => setEditTodoId(null)}>Cancel</button>
                                </div>
                            ) : (
                                // Display the todo title
                                <span>{todo.title}</span>
                            )}

                            {/* Edit and Delete buttons */}
                            <button onClick={() => {
                                setEditTodoId(todo.id);
                                setEditTodoTitle(todo.title);
                            }}>
                                Edit
                            </button>
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No todos found</p>
                )}
            </ul>
        </div>
    );
}

export default App;
