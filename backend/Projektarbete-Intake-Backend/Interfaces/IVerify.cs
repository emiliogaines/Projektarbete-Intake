using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Interfaces
{
    public interface IVerify
    {
        string Email { get; set; }
        string Hash { get; set; }
    }
}
