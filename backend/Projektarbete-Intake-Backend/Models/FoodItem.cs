using Projektarbete_Intake_Backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Models
{
    public class FoodItem : IFood
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long Calories { get; set; }
        public string Type { get; set; }
        public DateTime Time { get; set; }

        public FoodItem ToFoodItem()
        {
            return new FoodItem()
            {
                Id = this.Id,
                Name = this.Name,
                Calories = this.Calories,
                Type = this.Type,
                Time = this.Time
            };
        }
    }
}
