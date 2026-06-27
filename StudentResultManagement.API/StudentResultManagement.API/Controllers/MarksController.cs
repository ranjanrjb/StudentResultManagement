using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentResultManagement.API.Data;
using StudentResultManagement.API.DTOs;
using StudentResultManagement.API.Models;

namespace StudentResultManagement.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MarksController : ControllerBase
{
    private readonly AppDbContext _context;

    public MarksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/marks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Mark>>> GetAllMarks()
    {
        return await _context.Marks
            .Include(m => m.Student)
            .ToListAsync();
    }

    // GET: api/marks/student/1
    [HttpGet("student/{studentId}")]
    public async Task<ActionResult<IEnumerable<Mark>>> GetMarksByStudent(int studentId)
    {
        return await _context.Marks
            .Where(m => m.StudentId == studentId)
            .Include(m => m.Student)
            .ToListAsync();
    }

    // POST: api/marks
    [HttpPost]
    public async Task<ActionResult<Mark>> AddMark(CreateMarkDto dto)
    {
        var student = await _context.Students.FindAsync(dto.StudentId);

        if (student == null)
        {
            return BadRequest("Student not found");
        }

        var mark = new Mark
        {
            StudentId = dto.StudentId,
            SubjectName = dto.SubjectName,
            Score = dto.Score
        };

        _context.Marks.Add(mark);

        await _context.SaveChangesAsync();

        return Ok(mark);
    }

    // PUT: api/marks/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMark(int id, CreateMarkDto dto)
    {
        var mark = await _context.Marks.FindAsync(id);

        if (mark == null)
        {
            return NotFound();
        }

        mark.StudentId = dto.StudentId;
        mark.SubjectName = dto.SubjectName;
        mark.Score = dto.Score;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/marks/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMark(int id)
    {
        var mark = await _context.Marks.FindAsync(id);

        if (mark == null)
        {
            return NotFound();
        }

        _context.Marks.Remove(mark);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}