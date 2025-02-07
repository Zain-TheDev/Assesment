using TodoList.Core.Models;

namespace TodoList.Application.Interfaces
{
    public interface TodoApplication
    {
        Task<IEnumerable<TodoItem>> GetAllAsync();
        Task<TodoItem?> GetByIdAsync(int id);
        Task<TodoItem> CreateAsync(TodoItem todoItem);
        Task<bool> UpdateAsync(TodoItem todoItem);
        Task<bool> DeleteAsync(int id);
    }
}
