using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Models
{
    public class UserLoginItem
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class FetchItem
    {
        public string Email { get; set; }
        public string Hash { get; set; }
    }
}
