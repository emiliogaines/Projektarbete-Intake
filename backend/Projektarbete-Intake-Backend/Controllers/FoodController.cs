using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projektarbete_Intake_Backend.Interfaces;
using Projektarbete_Intake_Backend.Models;
using Projektarbete_Intake_Backend.Response;


namespace Projektarbete_Intake_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IntakeContext _context;

        public FoodController(IntakeContext context)
        {
            _context = context;
        }

        // GET: api/Food/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodItemApi>> GetFoodItem(long id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);

            if (foodItem == null)
            {
                return NotFound();
            }

            return foodItem;
        }

        // POST: api/Food
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FoodItemUserVerification>> PostFoodItem(FoodItemUserVerification sentFoodItem)
        {
            if (!Helpers.Account.Verify(_context, sentFoodItem.Email, sentFoodItem.Hash)) return BadRequest(Message.Response("Not authorized.", Message.Field.NONE));

            UserItem user = Helpers.Account.Fetch(_context, sentFoodItem.Email, sentFoodItem.Hash);

            FoodItemApi foodItem = Helpers.Mapper.From(sentFoodItem);
            foodItem.UserId = user.Id;

            _context.FoodItems.Add(foodItem);
            await _context.SaveChangesAsync();

            FoodItemApi item = (FoodItemApi)CreatedAtAction("GetFoodItem", new { id = foodItem.Id }, foodItem).Value;
            if (ApiDataExists(item.Name))
            {
                item.ApiData = await FetchApiData(item.Name);
            }
            else
            {
                item.ApiData = await HTTP.Http.Search(item.Name);
                if(item.ApiData != null) { 
                    _context.ApiItems.Add(new ApiItem(item.ApiData, item.Name));
                    await _context.SaveChangesAsync();
                }
            }
            
            return Ok(Message.Response(item));
        }

        // DELETE: api/Food/5
        [HttpPost("{id}")]
        public async Task<ActionResult<FoodItemApi>> DeleteFoodItem(long id, IVerify userVerify)
        {
            if (!Helpers.Account.Verify(_context, userVerify.Email, userVerify.Hash)) return BadRequest(Message.Response("Not authorized.", Message.Field.NONE));
            FoodItemApi foodItem = await _context.FoodItems.FindAsync(id);
            if (foodItem == null)
            {
                return NotFound();
            }

            _context.FoodItems.Remove(foodItem);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ApiDataExists(string tag)
        {
            return _context.ApiItems.Any(e => e.Tag == tag);
        }

        private async Task<string> FetchApiData(string tag)
        {
            var item = await _context.ApiItems.FirstOrDefaultAsync(e => e.Tag == tag);
            if(item != null)
            {
                return item.Data;
            }
            else
            {
                return null;
            }
        }
    }
    
}
