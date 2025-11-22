using Microsoft.AspNetCore.Mvc;
using SportsTogether.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SportsTogether.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private static readonly List<Game> Games = new List<Game>
        {
            new Game
            {
                Id = 1,
                Sport = "Badminton",
                Venue = "USM Sports Complex",
                Date = DateTime.Now.AddDays(2),
                CostPerPlayer = 5.00m,
                MaxPlayers = 4,
                OrganizerName = "John Doe",
                IsBookingVerified = true,
                IsTrustedOrganizer = true
            },
            new Game
            {
                Id = 2,
                Sport = "Futsal",
                Venue = "City Arena",
                Date = DateTime.Now.AddDays(5),
                CostPerPlayer = 10.00m,
                MaxPlayers = 10,
                OrganizerName = "Jane Smith",
                IsBookingVerified = false,
                IsTrustedOrganizer = false
            }
        };

        [HttpGet]
        public IEnumerable<Game> Get()
        {
            return Games;
        }

        [HttpPost]
        public IActionResult Post(Game game)
        {
            game.Id = Games.Max(g => g.Id) + 1;
            Games.Add(game);
            return CreatedAtAction(nameof(Get), new { id = game.Id }, game);
        }
    }
}