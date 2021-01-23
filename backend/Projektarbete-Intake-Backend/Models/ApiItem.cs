using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Models
{
    public class ApiItem
    {
        public long Id { get; set; }
        public string Data { get; set; }
        public string Tag { get; set; }

        public ApiItem(string data, string tag)
        {
            this.Data = data;
            this.Tag = tag;
        }
    }
}
