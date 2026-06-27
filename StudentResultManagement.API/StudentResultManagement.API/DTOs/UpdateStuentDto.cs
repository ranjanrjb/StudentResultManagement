namespace StudentResultManagement.API.DTOs;

public class UpdateStudentDto
{
    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public DateTime DateOfBirth { get; set; }
}