using Microsoft.EntityFrameworkCore;
using InterviewTask1.Models;

namespace InterviewTask1.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ToDo> TodoItems { get; set; }

    }
}
