namespace StudentResultManagement.API.Models
{
    public class Subject
    {
        public int SubjectID { get; set; }
        public string SubjectName { get; set; }
        public ICollection<Mark> Marks { get; set; } = new List<Mark>();
    }
}
