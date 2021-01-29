using Projektarbete_Intake_Backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Models
{
    public class JsonRegister : IRegister
    {
        public long Id { get; set; }
        public string PasswordAgain { get; set; }
        public string Hash { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
