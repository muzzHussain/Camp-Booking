using CampBookingAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBookingAPI.Context
{
    public class CampBookingDBContext : DbContext
    {
        public CampBookingDBContext(DbContextOptions<CampBookingDBContext> options):base(options)
        {

        }

        public DbSet<AdminModel> Admin { get; set; }

        public DbSet<CampModel> Camp { get; set; }

        public DbSet<BookingModel> Book { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AdminModel>().ToTable("tbl_admin");

            modelBuilder.Entity<CampModel>().ToTable("tbl_camp");

            modelBuilder.Entity<BookingModel>().ToTable("tbl_booking");
        }
    }
}
