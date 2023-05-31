using Microsoft.EntityFrameworkCore.Migrations;

namespace CampBookingAPI.Migrations
{
    public partial class campUpdateAddColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isBooked",
                table: "tbl_camp",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isBooked",
                table: "tbl_camp");
        }
    }
}
