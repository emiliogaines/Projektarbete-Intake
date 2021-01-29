using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Interfaces
{
    public interface ILogin
    {
        string Email { get; set; }
        string Password { get; set; }
    }
}
