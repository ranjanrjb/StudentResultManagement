using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentResultManagement.API.Data;
using StudentResultManagement.API.DTOs;

namespace StudentResultManagement.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ResultsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ResultsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/results
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ResultResponseDto>>> GetAllResults()
    {
        var students = await _context.Students
            .Include(s => s.Marks)
            .ToListAsync();

        var results = new List<ResultResponseDto>();

        foreach (var student in students)
        {
            if (!student.Marks.Any())
                continue;

            int total = student.Marks.Sum(m => m.Score);
            double average = student.Marks.Average(m => m.Score);

            string grade;

            if (average >= 90)
                grade = "A+";
            else if (average >= 80)
                grade = "A";
            else if (average >= 70)
                grade = "B";
            else if (average >= 60)
                grade = "C";
            else if (average >= 50)
                grade = "D";
            else
                grade = "F";

            string status = average >= 50 ? "Pass" : "Fail";

            results.Add(new ResultResponseDto
            {
                StudentId = student.StudentId,
                StudentName = student.FullName,
                TotalSubjects = student.Marks.Count,
                TotalMarks = total,
                AverageMarks = Math.Round(average, 2),
                Grade = grade,
                Status = status
            });
        }

        return Ok(results);
    }

    // GET: api/results/student/1
    [HttpGet("student/{studentId}")]
    public async Task<ActionResult<ResultResponseDto>> GetResult(int studentId)
    {
        var student = await _context.Students
            .Include(s => s.Marks)
            .FirstOrDefaultAsync(s => s.StudentId == studentId);

        if (student == null)
            return NotFound();

        if (!student.Marks.Any())
            return BadRequest("No marks found for this student.");

        int total = student.Marks.Sum(m => m.Score);
        double average = student.Marks.Average(m => m.Score);

        string grade;

        if (average >= 90)
            grade = "A+";
        else if (average >= 80)
            grade = "A";
        else if (average >= 70)
            grade = "B";
        else if (average >= 60)
            grade = "C";
        else if (average >= 50)
            grade = "D";
        else
            grade = "F";

        string status = average >= 50 ? "Pass" : "Fail";

        var result = new ResultResponseDto
        {
            StudentId = student.StudentId,
            StudentName = student.FullName,
            TotalMarks = total,
            AverageMarks = Math.Round(average, 2),
            Grade = grade,
            Status = status
        };

        return Ok(result);
    }
}