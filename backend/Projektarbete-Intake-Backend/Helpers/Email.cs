using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Helpers
{
    public static class Email
    {
        public static bool IsValid(string email)
        {
            // Making the shortest possible email "x@x.x"
            return (email.Contains('@') && email.Contains('.') && email.Length >= 5);
        }
    }
}
