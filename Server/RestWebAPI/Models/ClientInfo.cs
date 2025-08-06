using System.ComponentModel.DataAnnotations;
namespace RestWebAPI.Models
{
    public class ClientInfo
    {
        [Key]
        public required int clientId { get; set; }
        public required string firstName { get; set; }
        public required string lastName { get; set; }
        public required string email { get; set; }
        public required int age { get; set; }
        public required string locality { get; set; }
        public required string country { get; set; }

    }
}