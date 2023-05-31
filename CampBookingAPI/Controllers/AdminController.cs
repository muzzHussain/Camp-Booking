using CampBookingAPI.Context;
using CampBookingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly CampBookingDBContext _context;
        public AdminController(CampBookingDBContext context)
        {
            _context = context;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AdminModel adminObj)
        {
            if (adminObj == null)
                return BadRequest();

            var user = await _context.Admin
                .FirstOrDefaultAsync(x => x.UserName == adminObj.UserName && x.Password == adminObj.Password);
            if (user == null)
                return NotFound(new { Message = "Admin is not found" });
            
            return Ok(new { Message = "Yay, Login Success" });  
        }

        // For save data into DB
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AdminModel adminObj)
        {
            if (adminObj == null)
                return BadRequest();

            await _context.Admin.AddAsync(adminObj);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Admin Registered!" });
        }
    }
}
