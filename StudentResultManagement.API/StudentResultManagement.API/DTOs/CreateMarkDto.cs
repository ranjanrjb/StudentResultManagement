namespace StudentResultManagement.API.DTOs;

public class CreateMarkDto
{
    public int StudentId { get; set; }

    public string SubjectName { get; set; } = string.Empty;

    public int Score { get; set; }
}