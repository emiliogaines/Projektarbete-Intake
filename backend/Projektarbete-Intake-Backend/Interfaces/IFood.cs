using Projektarbete_Intake_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Interfaces
{
    public interface IFood
    {
        long Id { get; set; }
        string Name { get; set; }
        long Calories { get; set; }
        string Type { get; set; }
        DateTime Time { get; set; }

        FoodItem ToFoodItem();
    }
}
