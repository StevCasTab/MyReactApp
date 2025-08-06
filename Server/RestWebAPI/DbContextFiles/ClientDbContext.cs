using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using RestWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace RestWebAPI.Controllers
{
    public class ClientDbContext : DbContext
    {

        private readonly ILogger<ClientDbContext> _logger;

        public ClientDbContext(ILogger<ClientDbContext> logger, DbContextOptions<ClientDbContext> options) : base(options)
        {
            this._logger = logger;
        }

        public DbSet<ClientInfo> Clients { get; set; }

                protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}