using System;
using System.ComponentModel.DataAnnotations;

namespace SportsTogether.API.Models
{
    public class Game
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Sport { get; set; }

        [Required]
        public string Venue { get; set; }

        public DateTime Date { get; set; }

        [Range(0, 1000)]
        public decimal CostPerPlayer { get; set; }

        public int MaxPlayers { get; set; }
        
        public string OrganizerName { get; set; }

        // Trust System Logic
        public bool IsBookingVerified { get; set; } = false; 
        public bool IsTrustedOrganizer { get; set; } = false; 
    }
}