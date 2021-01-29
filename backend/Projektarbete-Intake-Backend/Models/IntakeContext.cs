using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Projektarbete_Intake_Backend.Models;

namespace Projektarbete_Intake_Backend.Models
{
    public class IntakeContext : DbContext
    {
        public IntakeContext(DbContextOptions<IntakeContext> options)
            : base(options)
        {
        }

        public DbSet<UserItem> UserItems { get; set; }
        public DbSet<FoodItemApi> FoodItems { get; set; }
        public DbSet<ApiItem> ApiItems { get; set; }
    }
}
