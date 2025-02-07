import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editTodo, setEditTodo] = useState({ id: "", title: "", isCompleted: false });

    // Get todos from API
    const fetchTodos = async () => {
        const response = await axios.get("https://localhost:7034/api/todo");
        setTodos(response.data);
    };

    // Create a new todo
    const handleAddTodo = async () => {
        const response = await axios.post("https://localhost:7034/api/todo", {
            title: newTodo,
            isCompleted: false
        });
        setNewTodo(""); // Clear input
        fetchTodos(); // Refresh todo list
    };

    // Update existing todo
    const handleUpdateTodo = async () => {
        const response = await axios.put(`https://localhost:7034/api/todo/${editTodo.id}`, {
            id: editTodo.id,
            title: editTodo.title,
            isCompleted: editTodo.isCompleted
        });
        setEditTodo({ id: "", title: "", isCompleted: false }); // Clear form
        fetchTodos(); // Refresh todo list
    };

    // Delete a todo
    const handleDeleteTodo = async (id) => {
        await axios.delete(`https://localhost:7034/api/todo/${id}`);
        fetchTodos(); // Refresh todo list
    };

    useEffect(() => {
        fetchTodos(); // Fetch todos when component mounts
    }, []);

    return (
        <div>
            <h1>To-Do List</h1>

            {/* Add Todo Section */}
            <div>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>

            {/* Todo List */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title} - {todo.isCompleted ? "Completed" : "Not Completed"}
                        <button onClick={() => {
                            setEditTodo({ id: todo.id, title: todo.title, isCompleted: todo.isCompleted });
                        }}>
                            Edit
                        </button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Edit Todo Section */}
            {editTodo.id && (
                <div>
                    <h2>Edit Todo</h2>
                    <input
                        type="text"
                        value={editTodo.title}
                        onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                    />
                    <button onClick={handleUpdateTodo}>Update</button>
                </div>
            )}
        </div>
    );
}

export default TodoList;
