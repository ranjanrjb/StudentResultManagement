import { useEffect, useState } from "react";
import api from "../services/api";

function Marks() {

    const emptyMark = {
        studentId: "",
        subjectName: "",
        score: ""
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

    function handleChange(e) {

        setMark({

            ...mark,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (

            mark.studentId === "" ||

            mark.subjectName.trim() === "" ||

            mark.score === ""

        ) {

            alert("Fill all fields.");

            return;

        }

        try {

            if (editingId === null) {

                await api.post("/Marks", {

                    studentId: Number(mark.studentId),

                    subjectName: mark.subjectName,

                    score: Number(mark.score)

                });

                alert("Mark added.");

            }

            else {

                await api.put(`/Marks/${editingId}`, {

                    studentId: Number(mark.studentId),

                    subjectName: mark.subjectName,

                    score: Number(mark.score)

                });

                alert("Mark updated.");

            }

            resetForm();

            loadMarks();

        }

        catch (err) {

            console.error(err);

            alert("Unable to save mark.");

        }

    }

    function editMark(selectedMark) {

        setEditingId(selectedMark.markId);

        setMark({

            studentId: selectedMark.studentId,

            subjectName: selectedMark.subjectName,

            score: selectedMark.score

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    async function deleteMark(id) {

        if (!window.confirm("Delete this mark?"))

            return;

        try {

            await api.delete(`/Marks/${id}`);

            loadMarks();

        }

        catch (err) {

            console.error(err);

            alert("Unable to delete.");

        }

    }

    function resetForm() {

        setEditingId(null);

        setMark(emptyMark);

    }

    return (

        <div className="container-fluid">

            <div className="card shadow-sm mb-4">

                <div className="card-header">

                    <h3>

                        {editingId === null

                            ? "Add Mark"

                            : "Edit Mark"}

                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Student

                                </label>

                                <select

                                    className="form-select"

                                    name="studentId"

                                    value={mark.studentId}

                                    onChange={handleChange}

                                >

                                    <option value="">

                                        Select Student

                                    </option>

                                    {students.map(student => (

                                        <option

                                            key={student.studentId}

                                            value={student.studentId}

                                        >

                                            {student.fullName}

                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Subject

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="subjectName"

                                    value={mark.subjectName}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Score

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="score"

                                    value={mark.score}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <button

                            className="btn btn-warning me-2"

                            type="submit"

                        >

                            {editingId === null

                                ? "Add Mark"

                                : "Update Mark"}

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

        <h3>Student Marks</h3>

    </div>

    <div className="card-body">

        {students.length === 0 ? (

            <p>No students found.</p>

        ) : (

            students.map(student => {

                const studentMarks = marks.filter(
                    m => m.studentId === student.studentId
                );

                const isExpanded =
                    expandedStudent === student.studentId;

                return (

                    <div
                        key={student.studentId}
                        className="card mb-3 border"
                    >

                        <div
                            className="card-header d-flex justify-content-between align-items-center"
                            style={{
                                cursor: "pointer",
                                backgroundColor: "#f8f4e8"
                            }}
                            onClick={() =>
                                setExpandedStudent(
                                    isExpanded
                                        ? null
                                        : student.studentId
                                )
                            }
                        >

                            <strong>

                                {student.fullName}

                            </strong>

                            <span
                                style={{
                                    fontSize: "22px",
                                    fontWeight: "bold"
                                }}
                            >

                                {isExpanded ? "−" : "+"}

                            </span>

                        </div>

                        {isExpanded && (

                            <div className="card-body">

                                {studentMarks.length === 0 ? (

                                    <p>

                                        No marks recorded.

                                    </p>

                                ) : (

                                    <table className="table table-bordered table-hover">

                                        <thead className="table-light">

                                            <tr>

                                                <th>Subject</th>

                                                <th>Score</th>

                                                <th>Date</th>

                                                <th width="170">

                                                    Actions

                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>
                                                                                        {studentMarks.map(m => (

                                                <tr key={m.markId}>

                                                    <td>

                                                        {m.subjectName}

                                                    </td>

                                                    <td>

                                                        {m.score}

                                                    </td>

                                                    <td>

                                                        {new Date(
                                                            m.dateRecorded
                                                        ).toLocaleDateString()}

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-sm btn-primary me-2"
                                                            onClick={() =>
                                                                editMark(m)
                                                            }
                                                        >

                                                            Edit

                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() =>
                                                                deleteMark(
                                                                    m.markId
                                                                )
                                                            }
                                                        >

                                                            Delete

                                                        </button>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                )}

                            </div>

                        )}

                    </div>

                );

            })

        )}

    </div>

</div>

        </div>

    );

}

export default Marks;