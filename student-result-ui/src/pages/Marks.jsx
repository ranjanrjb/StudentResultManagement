import { useEffect, useState } from "react";
import api from "../services/api";
import DynamicForm from "../components/DynamicForm";
import markSchema from "../validation/markSchema";
import markField from "../config/markField";
import DynamicTable from "../components/DynamicTable";
import markColumns from "../config/markColumns";
import { Card, Button, Input, Select } from "../components/ui";

function Marks() {
  const emptyMark = {
    studentId: "",
    subjectName: "",
    score: "",
  };

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [mark, setMark] = useState(emptyMark);

  const [editingId, setEditingId] = useState(null);
  const [expandedStudent, setExpandedStudent] = useState(null);

  useEffect(() => {
    loadStudents();
    loadMarks();
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

  async function loadMarks() {
    try {
      const response = await api.get("/Marks");

      setMarks(response.data);
    } catch (err) {
      console.error(err);

      alert("Unable to load marks.");
    }
  }

  function editMark(selectedMark) {
    setEditingId(selectedMark.markId);

    setMark({
      studentId: selectedMark.studentId,

      subjectName: selectedMark.subjectName,

      score: selectedMark.score,
    });

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  }

  async function deleteMark(id) {
    if (!window.confirm("Delete this mark?")) return;

    try {
      await api.delete(`/Marks/${id}`);

      loadMarks();
    } catch (err) {
      console.error(err);

      alert("Unable to delete.");
    }
  }

  function resetForm() {
    setEditingId(null);

    setMark(emptyMark);
  }

  async function handleSubmit(values, { setSubmitting, resetForm: formReset }) {
    try {
      if (editingId === null) {
        await api.post("/Marks", values);
        alert("Marks added successfully.");
      } else {
        await api.put(`/Marks/${editingId}`, values);
        alert("Marks updated successfully.");
      }

      resetForm();
      formReset();
      loadMarks();
    } catch (err) {
      console.error(err);
      alert("Unable to save marks.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Card className="mb-6">
        <Card.Header>
          {editingId === null ? "Add Mark" : "Edit Mark"}
        </Card.Header>

        <Card.Body>
          <DynamicForm
            initialValues={mark}
            validationSchema={markSchema}
            fields={markField(students)}
            editing={editingId !== null}
            onCancel={resetForm}
            onSubmit={handleSubmit}
            entityName={"Marks"}
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Student Marks</Card.Header>

        <Card.Body>
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            students.map((student) => {
              const studentMarks = marks.filter(
                (m) => m.studentId === student.studentId,
              );

              const isExpanded = expandedStudent === student.studentId;

              return (
                <div
                  key={student.studentId}
                  className="mb-3 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300"
                >
                  {" "}
                  <div
                    className="flex
justify-between items-center cursor-pointer px-4 py-3 transition-colors duration-300 bg-amber-50 hover:bg-amber-100 dark:bg-gray-800 dark:hover:bg-gray-700
"
                    onClick={() =>
                      setExpandedStudent(isExpanded ? null : student.studentId)
                    }
                  >
                    <strong className="text-gray-800 dark:text-gray-100">
                      {student.fullName}
                    </strong>
                    <span className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </div>
                  {isExpanded && (
                    <Card.Body>
                      {studentMarks.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-300">
                          No marks recorded.
                        </p>
                      ) : (
                        <DynamicTable
                          data={studentMarks}
                          columns={markColumns}
                          keyField="markId"
                          onEdit={editMark}
                          onDelete={deleteMark}
                          emptyMessage="No students found."
                        />
                      )}
                    </Card.Body>
                  )}
                </div>
              );
            })
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Marks;
