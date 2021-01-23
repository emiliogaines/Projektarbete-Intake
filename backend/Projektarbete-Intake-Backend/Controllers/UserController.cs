using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projektarbete_Intake_Backend.Models;
using Projektarbete_Intake_Backend.Response;

namespace Projektarbete_Intake_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IntakeContext _context;

        public UserController(IntakeContext context)
        {
            _context = context;
        }

        // POST: api/User/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{id}")]
        public async Task<IActionResult> PutUserItem(long id, UserItem user)
        {
            if(!Helpers.Account.Verify(_context, user.Email, user.Hash)) return BadRequest(Message.Response("Not authorized.", Message.Field.NONE));
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }

            return Ok();
        }


        private bool UserItemExists(long id)
        {
            return _context.UserItems.Any(e => e.Id == id);
        }
    }
}
