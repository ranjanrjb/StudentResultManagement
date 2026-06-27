using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentResultManagement.API.Data;
using StudentResultManagement.API.DTOs;
using StudentResultManagement.API.Models;

namespace StudentResultManagement.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public StudentsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/students
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
    {
        return await _context.Students.ToListAsync();
    }

    // GET: api/students/1
    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudent(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
        {
            return NotFound();
        }

        return student;
    }

    // POST: api/students
    [HttpPost]
    public async Task<ActionResult<Student>> CreateStudent(CreateStudentDto dto)
    {
        var student = new Student
        {
            FullName = dto.FullName,
            Email = dto.Email,
            DateOfBirth = dto.DateOfBirth,
            EnrollmentDate = DateTime.Now
        };

        _context.Students.Add(student);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetStudent),
            new { id = student.StudentId },
            student);
    }

    // PUT: api/students/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(
        int id,
        UpdateStudentDto dto)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
        {
            return NotFound();
        }

        student.FullName = dto.FullName;
        student.Email = dto.Email;
        student.DateOfBirth = dto.DateOfBirth;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/students/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
        {
            return NotFound();
        }

        _context.Students.Remove(student);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}