using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Interfaces;
using TodoList.Core.Models;

namespace TodoList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoApplication _todoService;

        public TodoController(TodoApplication todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _todoService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var todo = await _todoService.GetByIdAsync(id);
            return todo == null ? NotFound() : Ok(todo);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TodoItem todoItem)
        {
            if (string.IsNullOrWhiteSpace(todoItem.Title))
                return BadRequest("Title is required");

            var createdTodo = await _todoService.CreateAsync(todoItem);
            return CreatedAtAction(nameof(Get), new { id = createdTodo.Id }, createdTodo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TodoItem todoItem)
        {
            if (id != todoItem.Id) return BadRequest("ID mismatch");

            return await _todoService.UpdateAsync(todoItem) ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await _todoService.DeleteAsync(id) ? NoContent() : NotFound();
        }
    }
}
