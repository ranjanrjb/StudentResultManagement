using System.ComponentModel.DataAnnotations.Schema;

namespace StudentResultManagement.API.Models;

public class Student
{
    public int StudentId { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    [Column(TypeName = "date")]
    public DateTime DateOfBirth { get; set; }
    public ICollection<Mark> Marks { get; set; } = new List<Mark>();

}