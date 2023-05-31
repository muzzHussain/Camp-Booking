using CampBookingAPI.Context;
using CampBookingAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBookingAPI.Controllers
{

    [Route("api/[controller]")]
    //[EnableCors("AllowOrigin")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly CampBookingDBContext _context;

        private static Random random = new Random();

        public BookingController(CampBookingDBContext context)
        {
            _context = context;
        }

        private string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpPost("addBooking")]
        public async Task<IActionResult> AddBooking([FromBody] BookingModel bookObj)
        {
            var model = new CampModel();
            var refNo = RandomString(8);
            if (bookObj == null)
                return BadRequest();

            var camp = _context.Camp.FirstOrDefault(x => x.Id == bookObj.campId);
            if (camp != null)
            {
                camp.CampName = camp.CampName;
                camp.RatePerNight = camp.RatePerNight;
                camp.Capacity = camp.Capacity;
                camp.Description = camp.Description;
                camp.CheckIn = camp.CheckIn;
                camp.CheckOut = camp.CheckOut;
                camp.Image = camp.Image;
                camp.TotalStay = camp.TotalStay;
                camp.isBooked = true;
                camp.userCounter += 1;
            }
            _context.SaveChanges();
            bookObj.BRN = refNo;
            await _context.Book.AddAsync(bookObj);
            await _context.SaveChangesAsync();
            return Ok(new { Message = refNo });
        }

        [HttpGet("SearchBook/{brn}")]
        public async Task<IList<BookingModel>> SearchBRN(string brn)
        {
            var result = await _context.Book.Where(x => x.BRN == brn).ToListAsync();
            return result;
        }

        
        [HttpDelete("DeleteBooking/{id:int}/{campId:int}/{rating:int}")]
        public async Task<IActionResult> DeleteBooking(int? id, int? campId, int rating)
        {
            if (id == null)
                return BadRequest("Id is not valid");

            var result = await _context.Book.FirstOrDefaultAsync(x => x.Id == id);

            var camp = await _context.Camp.FirstOrDefaultAsync(x => x.Id == campId);
            if (camp != null)
            {
                camp.CampName = camp.CampName;
                camp.RatePerNight = camp.RatePerNight;
                camp.Capacity = camp.Capacity;
                camp.Description = camp.Description;
                camp.CheckIn = camp.CheckIn;
                camp.CheckOut = camp.CheckOut;
                camp.Image = camp.Image;
                camp.TotalStay = camp.TotalStay;
                camp.isBooked = false;
                camp.overallRating += rating;
                camp.averageRating = (camp.averageRating + rating) / camp.userCounter;
            }
            _context.SaveChanges();
            _context.Remove(result);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Booking Cancelled Successfull." });
        }

        [HttpDelete("UpdateBooking/{id:int}/{campId:int}/{rating:int}")]
        public async Task<IActionResult> UpdateBooking(int? id, int? campId, int rating)
        {
            if (id == null)
                return BadRequest("Id is not valid");

            var result = await _context.Book.FirstOrDefaultAsync(x => x.Id == id);

            var camp = await _context.Camp.FirstOrDefaultAsync(x => x.Id == campId);
            if (camp != null)
            {
                camp.CampName = camp.CampName;
                camp.RatePerNight = camp.RatePerNight;
                camp.Capacity = camp.Capacity;
                camp.Description = camp.Description;
                camp.CheckIn = camp.CheckIn;
                camp.CheckOut = camp.CheckOut;
                camp.Image = camp.Image;
                camp.TotalStay = camp.TotalStay;
                camp.overallRating += rating;
                camp.averageRating = (camp.averageRating + rating) / camp.userCounter;
            }
            _context.SaveChanges();
            return Ok(new { Message = "Rating has been Updated." });
        }
    }
}
