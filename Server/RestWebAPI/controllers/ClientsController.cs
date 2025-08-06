using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestWebAPI.Controllers;
using RestWebAPI.Models;

namespace RestWebAPI
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly ClientDbContext _context;

        public ClientsController(ClientDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _context.Clients.ToListAsync();
            return Ok(clients);
        }
    }
}