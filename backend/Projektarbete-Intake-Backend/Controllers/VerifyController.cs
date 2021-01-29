using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projektarbete_Intake_Backend.Interfaces;
using Projektarbete_Intake_Backend.Models;
using Projektarbete_Intake_Backend.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerifyController : ControllerBase
    {
        private readonly IntakeContext _context;

        public VerifyController(IntakeContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<IVerify>> Post(JsonVerify user)
        {
            UserItem fetchedUser = FetchUser(user.Email);
            if (fetchedUser == null)
            {
                return NotFound(Message.Response("No account found.", Message.Field.EMAIL));
            }

            if (Helpers.Account.Verify(_context, user.Email, user.Hash))
            {
                fetchedUser.Populate(_context);
                return Ok(Message.Response(fetchedUser));
            }
            else
            {
                return NotFound(Message.Response("No account with these credentials found.", Message.Field.NONE));
            }
        }

        private UserItem FetchUser(string email)
        {
            return _context.UserItems.FirstOrDefault(user => user.Email == email);
        }
    }
}
