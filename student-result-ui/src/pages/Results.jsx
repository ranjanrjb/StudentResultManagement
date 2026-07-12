import { useEffect, useState } from "react";
import api from "../services/api";
import { Card, Button, Input, Select } from "../components/ui";

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
    <div className="space-y-6">
      <Card>
        <Card.Header>Student Results</Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                View Student Result
              </label>
              <select
                className="w-full
          rounded-lg
          border
          border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          px-3
          py-2
          outline-none
          transition-colors duration-300
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-300"
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
            <div>
              <Button variant="warning" onClick={viewResult}>
                View Result
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {loading && <h5>Loading...</h5>}

      {!loading && result && (
        <>
          <Card>
            <Card.Header>Result Summary</Card.Header>

            <Card.Body>
              <div>
                <p className="text-sm text-gray-500">Student Name</p>

                <p className="text-lg font-semibold">{result.studentName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Marks</p>

                <p className="text-lg font-semibold">{result.totalMarks}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Average Marks</p>

                <p className="text-lg font-semibold">{result.averageMarks}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Grade</p>
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {result.grade}
                </span>{" "}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <strong>Status</strong>
                </div>

                <div className="col-md-6">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                      result.status === "Pass"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result.status}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
}

export default Results;
