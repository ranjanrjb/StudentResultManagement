import { useEffect, useState } from "react";
import api from "../services/api";

function Students() {
  const emptyStudent = {
    fullName: "",
    email: "",
    dateOfBirth: "",
  };

  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(emptyStudent);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      setLoading(true);

      const response = await api.get("/Students");

      setStudents(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      student.fullName.trim() === "" ||
      student.email.trim() === "" ||
      student.dateOfBirth === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editingId === null) {
        await api.post("/Students", student);
        alert("Student added successfully.");
      } else {
        await api.put(`/Students/${editingId}`, student);
        alert("Student updated successfully.");
      }

      resetForm();
      loadStudents();
    } catch (err) {
      console.error(err);
      alert("Unable to save student.");
    }
  }

  function editStudent(selectedStudent) {
    setEditingId(selectedStudent.studentId);

    setStudent({
      fullName: selectedStudent.fullName,
      email: selectedStudent.email,
      dateOfBirth: selectedStudent.dateOfBirth.split("T")[0],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteStudent(id) {
    const confirmDelete = window.confirm("Delete this student?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/Students/${id}`);

      loadStudents();
    } catch (err) {
      console.error(err);
      alert("Unable to delete student.");
    }
  }

  function resetForm() {
    setEditingId(null);
    setStudent(emptyStudent);
  }

  return (
    <div className="container-fluid">
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h3 className="mb-0">
            {editingId === null ? "Add Student" : "Edit Student"}
          </h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Full Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={student.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Date of Birth</label>

                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={student.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="btn btn-warning me-2" type="submit">
              {editingId === null ? "Add Student" : "Update Student"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Clear
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="mb-0">Students</h3>
        </div>

        <div className="card-body">
          {loading ? (
            <h5>Loading...</h5>
          ) : (
            <table className="table table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Enrollment</th>
                  <th width="170">Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((s, index) => (
                    <tr key={s.studentId}>
                      <td>{index + 1}</td>

                      <td>{s.fullName}</td>

                      <td>{s.email}</td>

                      <td>{new Date(s.dateOfBirth).toLocaleDateString()}</td>

                      <td>{new Date(s.enrollmentDate).toLocaleDateString()}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => editStudent(s)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteStudent(s.studentId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;
