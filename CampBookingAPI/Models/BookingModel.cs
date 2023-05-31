using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CampBookingAPI.Models
{
    public class BookingModel
    {   
        [Key]
        public int Id { get; set; }

        public string BRN { get; set; }

        public string address { get; set; }

        public string state { get; set; }

        public string country { get; set; }

        public string zipCode { get; set; }

        public string phoneNo { get; set; }

        public int campId { get; set; }
    }
}
