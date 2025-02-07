using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TodoList.Application.Interfaces;
using TodoList.Infrastructure.Persistence;
using TodoList.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000") // Allow both HTTP & HTTPS
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials()); // Allow cookies/auth headers if needed
});

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlite("Data Source=todo.db"));
builder.Services.AddScoped<TodoService, TodoService>();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
});
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://localhost:3000") // Allow frontend URLs
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API v1"));
}

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();
app.Run();
