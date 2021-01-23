using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Projektarbete_Intake_Backend.Models;
using Projektarbete_Intake_Backend.Response;

namespace Projektarbete_Intake_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IntakeContext _context;

        public RegisterController(IntakeContext context)
        {
            _context = context;
        }

        // POST: api/Register
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserRegisterItem>> Post(UserRegisterItem user)
        {
            if (UserExists(user.Email))
            {
                return BadRequest(Message.Response("Email already exists.", Message.Field.EMAIL));
            }

            if (!Helpers.Email.IsValid(user.Email))
            {
                return BadRequest(Message.Response("Email is invalid.", Message.Field.EMAIL));
            }

            if (!Helpers.Password.IsValid(user.Password))
            {
                return BadRequest(Message.Response("Password has to be atleast 6 characters.", Message.Field.PASSWORD));
            }

            if (!Helpers.Password.Matches(user.Password, user.PasswordAgain))
            {
                return BadRequest(Message.Response("Passwords does not match.", Message.Field.PASSWORD_AGAIN));
            }

            user.Hash = Helpers.Password.Hash(user.Password);

            UserItem userItem = new UserItem();
            userItem.FromRegisterItem(user);

            _context.UserItems.Add(userItem);
            await _context.SaveChangesAsync();

            userItem.Populate(_context);
            return Ok(Message.Response(userItem));
        }

        private bool UserExists(string email)
        {
            return _context.UserItems.Any(e => e.Email == email);
        }
    }
}
