using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Projektarbete_Intake_Backend.Interfaces;
using Projektarbete_Intake_Backend.Models;
using Projektarbete_Intake_Backend.Response;

namespace Projektarbete_Intake_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IntakeContext _context;

        public LoginController(IntakeContext context)
        {
            _context = context;
        }

        // POST: api/Login
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ILogin>> Post(JsonLogin user)
        {
            UserItem fetchedUser = FetchUser(user.Email);
            if(fetchedUser == null)
            {
                return NotFound(Message.Response("No account found.", Message.Field.EMAIL));
            }

            if(Helpers.Password.Verify(user.Password, fetchedUser.Hash))
            {
                fetchedUser.Populate(_context);
                return Ok(Message.Response(fetchedUser));
            }
            else
            {
                return NotFound(Message.Response("No account with these credentials found.", Message.Field.EMAIL));
            }
        }

        public UserItem FetchUser(string email)
        {
            return _context.UserItems.FirstOrDefault(user => user.Email == email);
        }


    }
}
