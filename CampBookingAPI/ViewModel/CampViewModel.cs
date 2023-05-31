using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CampBookingAPI.ViewModel
{
    public class CampViewModel
    {
        [Key]
        public int Id { get; set; }
        public string CampName { get; set; }
        public int RatePerNight { get; set; }
        public int Capacity { get; set; }
        public string Description { get; set; }

        public IFormFile Image { get; set; }
        public int TotalStay { get; set; }

        [DataType(DataType.Date)]
        public DateTime CheckIn { get; set; }

        [DataType(DataType.Date)]
        public DateTime CheckOut { get; set; }
    }
}
