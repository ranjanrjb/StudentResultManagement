namespace StudentResultManagement.API.DTOs;

public class ResultResponseDto
{
    public int StudentId { get; set; }

    public string StudentName { get; set; } = string.Empty;

    public int TotalMarks { get; set; }

    public double AverageMarks { get; set; }

    public string Grade { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
}