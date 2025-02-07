using Microsoft.EntityFrameworkCore;
using TodoList.Core.Models;

namespace TodoList.Infrastructure.Persistence
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

        public DbSet<TodoItem> Todos { get; set; }
    }
}
