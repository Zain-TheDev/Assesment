using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces;
using TodoList.Core.Models;
using TodoList.Infrastructure.Persistence;

namespace TodoList.Infrastructure.Services
{
    public class TodoService : Application.Interfaces.TodoApplication
    {
        private readonly TodoDbContext _context;

        public TodoService(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoItem>> GetAllAsync()
            => await _context.Todos.ToListAsync();

        public async Task<TodoItem?> GetByIdAsync(int id)
            => await _context.Todos.FindAsync(id);

        public async Task<TodoItem> CreateAsync(TodoItem todoItem)
        {
            _context.Todos.Add(todoItem);
            await _context.SaveChangesAsync();
            return todoItem;
        }

        public async Task<bool> UpdateAsync(TodoItem todoItem)
        {
            _context.Todos.Update(todoItem);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return false;

            _context.Todos.Remove(todo);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
