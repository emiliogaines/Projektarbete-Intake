using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Models
{
    public class UserItem
    {
        public long Id { get; set; }
        public string Name { get; set; } = "User";
        public string Email { get; set; }
        public string Hash { get; set; }

        // Weight
        public float CurrentWeight { get; set; } = 0;
        public float StartWeight { get; set; } = 0;
        public float TargetWeight { get; set; } = 0;

        // Calories
        public long TargetCalorieIntake { get; set; } = 0;

        // Settings
        public bool UseMetric { get; set; } = true;

        //Days
        public FoodItemApi[] FoodItems = null;

        public void Populate(IntakeContext context)
        {
            this.FoodItems = context.FoodItems.Where(food => food.UserId == this.Id).ToArray();
        }
    }
}
