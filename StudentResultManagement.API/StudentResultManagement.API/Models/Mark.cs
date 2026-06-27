namespace StudentResultManagement.API.Models;

public class Mark
{
    public int MarkId { get; set; }

    public int StudentId { get; set; }

    public string SubjectName { get; set; } = string.Empty;

    public int Score { get; set; }

    public DateTime DateRecorded { get; set; } = DateTime.Now;

    public Student? Student { get; set; }
}