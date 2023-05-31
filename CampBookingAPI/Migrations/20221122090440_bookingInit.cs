using Microsoft.EntityFrameworkCore.Migrations;

namespace CampBookingAPI.Migrations
{
    public partial class bookingInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_booking",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BRN = table.Column<string>(type: "varchar(max)", nullable: false),
                    address = table.Column<string>(type: "varchar(max)", nullable: false),
                    state = table.Column<string>(type: "varchar(max)", nullable: false),
                    country = table.Column<string>(type: "varchar(max)", nullable: false),
                    zipCode = table.Column<int>(type: "int", nullable: false),
                    phoneNo = table.Column<string>(type: "varchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_booking", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_booking");
        }
    }
}
