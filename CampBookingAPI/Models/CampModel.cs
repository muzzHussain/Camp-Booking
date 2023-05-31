using System;
using System.ComponentModel.DataAnnotations;

namespace CampBookingAPI.Models
{
    public class CampModel
    {
        [Key]
        public int Id { get; set; }
        public string CampName { get; set; }
        public int RatePerNight { get; set; }
        public int? Capacity { get; set; }
        public string Description { get; set; }

        public string Image { get; set; }
        public int TotalStay { get; set; }

        [DataType(DataType.Date)]
        public DateTime CheckIn { get; set; }

        [DataType(DataType.Date)]
        public DateTime CheckOut { get; set; }

        public bool isBooked { get; set; }

        public decimal averageRating { get; set; }

        public int userCounter { get; set; }

        public int overallRating { get; set; }
    }
}
