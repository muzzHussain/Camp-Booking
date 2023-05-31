using CampBookingAPI.Context;
using CampBookingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CampBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampController : ControllerBase
    {
        private readonly CampBookingDBContext _context;

        private static Random random = new Random();
        public CampController(CampBookingDBContext context)
        {
            _context = context;
        }

        [HttpGet("campList")]
        public async Task<IList<CampModel>> CampList()
        {
            return await _context.Camp.Where(x=> x.isBooked == false || x.CheckIn >= DateTime.Now).ToListAsync();
        }

        [HttpGet("campListAdmin")]
        public async Task<IList<CampModel>> CampListAdmin()
        {
            return await _context.Camp.ToListAsync();
        }

        [HttpPost("addCampDb")]
        public async Task<IActionResult> AddCamps([FromBody] CampModel campObj)
        { 
            if (campObj == null)
                return BadRequest();
            campObj.isBooked = false;
            await _context.Camp.AddAsync(campObj);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Camp Addedd Successfully!" });
        }

        [HttpGet("fetchCamp/{id}")]
        public async Task<IList<CampModel>> FetchCampById(int id)
        {
            return await _context.Camp.Where(x => x.Id == id).ToListAsync();
        }

        [HttpGet("filterSearch/{CheckIn}/{CheckOut}/{Capacity}")]
        public async Task<IList<CampModel>> FilterCamp(DateTime checkIn, DateTime checkOut, int? capacity)
        {
            if (capacity == 0)
            {
                return await _context.Camp.ToListAsync();
            }
            else
            {
                var result = from e in _context.Camp
                             where e.CheckIn <= checkIn && e.CheckOut <= checkOut && e.Capacity == capacity && e.isBooked == false
                             select e;
                return await result.ToListAsync();
            }
        }

        [HttpDelete("DeleteCamp/{id:int}")]
        public async Task<IActionResult> DeleteCamp(int? id)
        {
            if (id == null)
                return BadRequest("Id is not valid");

            var result = await _context.Camp.FirstOrDefaultAsync(x => x.Id == id);

            _context.Remove(result);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Delete Successfull." });
        }

        [HttpPut("UpdateCamp/{id:int}")]
        public bool UpdateCamp(int id, CampModel model)
        {
            var camp = _context.Camp.FirstOrDefault(x => x.Id == id);
            if (camp != null)
            {
                camp.CampName = model.CampName;
                camp.RatePerNight = model.RatePerNight;
                camp.Capacity = model.Capacity;
                camp.Description = model.Description;
                camp.CheckIn = model.CheckIn;
                camp.CheckOut = model.CheckOut;
                camp.Image = model.Image;
                camp.TotalStay = model.TotalStay;
            }
            _context.SaveChanges();
            return true;
        }

    }
}
