using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Helpers
{
    public static class Password
    {
        // Length requirement because, well, it's obvious why.
        public static bool IsValid(string password)
        {
            return (password.Length >= 6);
        }

        // Check if both password matches
        public static bool Matches(string password, string passwordAgain)
        {
            return (password == passwordAgain);
        }

        public static string Hash(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool Verify(string password, string databasPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, databasPassword);
        }
    }
}
