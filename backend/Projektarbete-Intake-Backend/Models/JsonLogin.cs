using Projektarbete_Intake_Backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Models
{
    public class JsonLogin : ILogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
