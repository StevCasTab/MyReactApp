using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RestWebAPI.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORSPolicy",
                        policy =>
                        {
                            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                        });
});

builder.Services.AddDbContext<ClientDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(
        options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            options.RoutePrefix = string.Empty;
        }
    );
}

// app.MapGet("/clients", () =>
// {
//     using (StreamReader r = new StreamReader("ClientInfo.json"))
//     {
//         string json = r.ReadToEnd();

//         List<ClientInfo> clients = JsonSerializer.Deserialize<List<ClientInfo>>(json);

//         return clients;
//     }
// }).WithName("GetClients");


app.UseHttpsRedirection();
app.MapControllers();
app.UseCors("CORSPolicy");
app.Run();
