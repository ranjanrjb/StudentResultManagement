const studentColumns = [
  {
    header: "S.No",
    render: (row, index) => index + 1,
  },
  {
    header: "Name",
    accessor: "fullName",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Date of Birth",
    render: (row) => new Date(row.dateOfBirth).toLocaleDateString(),
  },
  {
    header: "Enrollment",
    render: (row) => new Date(row.enrollmentDate).toLocaleDateString(),
  },
];

export default studentColumns;
