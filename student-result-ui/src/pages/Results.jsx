import { useEffect, useState } from "react";
import api from "../services/api";

function Results() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  const [result, setResult] = useState(null);
  const [marks, setMarks] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const response = await api.get("/Students");

      setStudents(response.data);
    } catch (err) {
      console.error(err);

      alert("Unable to load students.");
    }
  }

  async function viewResult() {
    if (selectedStudent === "") {
      alert("Please select a student.");

      return;
    }

    try {
      setLoading(true);

      const resultResponse = await api.get(
        `/Results/student/${selectedStudent}`,
      );

      const marksResponse = await api.get(`/Marks/student/${selectedStudent}`);

      setResult(resultResponse.data);

      setMarks(marksResponse.data);
    } catch (err) {
      console.error(err);

      alert("Unable to load result.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid">
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h3>Student Results</h3>
        </div>

        <div className="card-body">
          <div className="row align-items-end">
            <div className="col-md-8">
              <label className="form-label">Select Student</label>

              <select
                className="form-select"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <button className="btn btn-warning w-100" onClick={viewResult}>
                View Result
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && <h5>Loading...</h5>}

      {!loading && result && (
        <>
          <div className="card shadow-sm mb-4">
            <div className="card-header">
              <h4 className="mb-0">Result Summary</h4>
            </div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Student Name</strong>
                </div>

                <div className="col-md-6">{result.studentName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Total Marks</strong>
                </div>

                <div className="col-md-6">{result.totalMarks}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Average Marks</strong>
                </div>

                <div className="col-md-6">{result.averageMarks}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Grade</strong>
                </div>

                <div className="col-md-6">
                  <span className="badge bg-primary">{result.grade}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <strong>Status</strong>
                </div>

                <div className="col-md-6">
                  <span
                    className={
                      result.status === "Pass"
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >
                    {result.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header">
              <h4 className="mb-0">Subject-wise Marks</h4>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Subject</th>

                    <th>Marks</th>

                    <th>Date Recorded</th>
                  </tr>
                </thead>

                <tbody>
                  {marks.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No marks available.
                      </td>
                    </tr>
                  ) : (
                    marks.map((mark) => (
                      <tr key={mark.markId}>
                        <td>{mark.subjectName}</td>

                        <td>{mark.score}</td>

                        <td>
                          {new Date(mark.dateRecorded).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Results;
