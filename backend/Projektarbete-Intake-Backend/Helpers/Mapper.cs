using Projektarbete_Intake_Backend.Interfaces;
using Projektarbete_Intake_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Helpers
{
    public static class Mapper
    {
        public static FoodItemApi From(IFood fromFoodItem)
        {
            return new FoodItemApi()
            {
                Id = fromFoodItem.Id,
                Name = fromFoodItem.Name,
                Calories = fromFoodItem.Calories,
                Type = fromFoodItem.Type,
                Time = fromFoodItem.Time
            };
        }

        public static UserItem From(IRegister fromUserItem)
        {
            return new UserItem()
            {
                Id = fromUserItem.Id,
                Email = fromUserItem.Email,
                Hash = fromUserItem.Hash,
            };
        }
    }
}
