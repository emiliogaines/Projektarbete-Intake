using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Models
{
    public class FoodItemSent
    {
        public string Email { get; set; }
        public string Hash { get; set; }
        public long Id { get; set; }
        public string Name { get; set; }
        public long Calories { get; set; }
        public string Type { get; set; }
        public DateTime Time { get; set; }
    }
}
