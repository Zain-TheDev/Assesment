import axios from "axios";

const API_BASE_URL = "https://localhost:7034/api/todo"; // Ensure the backend is running

export const fetchTodos = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
};
