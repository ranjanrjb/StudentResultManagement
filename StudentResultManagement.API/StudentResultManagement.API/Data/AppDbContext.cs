using Microsoft.EntityFrameworkCore;
using StudentResultManagement.API.Models;

namespace StudentResultManagement.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Student> Students { get; set; }

    public DbSet<Mark> Marks { get; set; }
}