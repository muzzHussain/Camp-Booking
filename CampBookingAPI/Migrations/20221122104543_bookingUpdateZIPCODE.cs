using Microsoft.EntityFrameworkCore.Migrations;

namespace CampBookingAPI.Migrations
{
    public partial class bookingUpdateZIPCODE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "zipCode",
                table: "tbl_booking",
                type: "varchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "zipCode",
                table: "tbl_booking",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
