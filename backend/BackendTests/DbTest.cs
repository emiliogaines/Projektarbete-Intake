using Microsoft.EntityFrameworkCore;
using Projektarbete_Intake_Backend.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendTests
{
    public class DbTest { 
        protected DbTest()
        {
            ContextOptions = new DbContextOptionsBuilder<IntakeContext>()
            .UseInMemoryDatabase(databaseName: "UnitTestDatabase")
            .Options;

            Seed();
        }

        protected DbContextOptions<IntakeContext> ContextOptions { get; }

        private void Seed()
        {
            using (var context = new IntakeContext(ContextOptions))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                var one = new FoodItemApi
                {
                    Name = "Pizza",
                    Calories = 1250
                };

                var two = new FoodItemApi
                {
                    Name = "Taco",
                    Calories = 720
                };

                var three = new FoodItemApi
                {
                    Name = "Monster Energy Drink",
                    Calories = 95
                };

                context.AddRange(one, two, three);

                context.SaveChanges();
            }
        }
    }
}
