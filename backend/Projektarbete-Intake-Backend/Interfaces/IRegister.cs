using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Interfaces
{
    public interface IRegister : ILogin
    {
        public long Id { get; set; }
        public string PasswordAgain { get; set; }
        public string Hash { get; set; }
    }
}
