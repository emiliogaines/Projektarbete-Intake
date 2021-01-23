using Projektarbete_Intake_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Helpers
{
    public class Account
    {
        public static bool Verify(IntakeContext context, string email, string hash)
        {
            return context.UserItems.Any(user => (user.Email == email && user.Hash == hash));
        }

        public static UserItem Fetch(IntakeContext context, string email, string hash)
        {
            return context.UserItems.FirstOrDefault(user => (user.Email == email && user.Hash == hash));
        }
    }
}
