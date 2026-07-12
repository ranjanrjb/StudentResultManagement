const markField = (students) => [
  {
    name: "studentId",
    label: "Student",
    type: "select",
    placeholder: "Select Student",
    options: students.map((student) => ({
      value: student.studentId,
      label: student.fullName,
    })),
  },
  {
    name: "subjectName",
    label: "Subject",
    type: "text",
  },
  {
    name: "score",
    label: "Score",
    type: "number",
  },
];

export default markField;
