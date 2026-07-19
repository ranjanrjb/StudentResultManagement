namespace StudentResultManagement.API.DTOs;

public class CreateMarkDto
{
    public int StudentId { get; set; }

    public int SubjectId { get; set; }

    public int Score { get; set; }
}