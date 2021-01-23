using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Models
{
    public class FoodItem
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }
        public long Calories { get; set; }
        public string Type { get; set; }
        public DateTime Time { get; set; }

        public string ApiData { get; set; }

        public void FromSentItem(FoodItemSent foodItem)
        {
            this.Id = foodItem.Id;
            this.Name = foodItem.Name;
            this.Calories = foodItem.Calories;
            this.Type = foodItem.Type;
            this.Time = foodItem.Time;
        }
    }
}
