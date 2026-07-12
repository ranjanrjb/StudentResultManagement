import { useEffect, useState } from "react";
import api from "../services/api";
import DynamicForm from "../components/DynamicForm";
import studentSchema from "../validation/studentschema";
import studentField from "../config/studentField";
import DynamicTable from "../components/DynamicTable";
import studentColumns from "../config/studentColumns";
import { Card, Button, Input, Select } from "../components/ui";

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

  async function handleSubmit(values, { setSubmitting, resetForm: formReset }) {
    try {
      if (editingId === null) {
        await api.post("/Students", values);
        alert("Student added successfully.");
      } else {
        await api.put(`/Students/${editingId}`, values);
        alert("Student updated successfully.");
      }

      resetForm();
      formReset();
      loadStudents();
    } catch (err) {
      console.error(err);
      alert("Unable to save student.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <Card.Header>{editingId ? "Edit Student" : "Add Student"}</Card.Header>

        <Card.Body>
          <DynamicForm
            initialValues={student}
            validationSchema={studentSchema}
            fields={studentField}
            editing={editingId !== null}
            onCancel={resetForm}
            onSubmit={handleSubmit}
            entityName={"Student"}
          />
        </Card.Body>
      </Card>

      <Card className="min-w-full">
        <Card.Header>Students</Card.Header>
        <Card.Body>
          {loading ? (
            <h5>Loading...</h5>
          ) : (
            <DynamicTable
              data={students}
              columns={studentColumns}
              keyField="studentId"
              onEdit={editStudent}
              onDelete={deleteStudent}
              emptyMessage="No students found."
            />
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Students;
