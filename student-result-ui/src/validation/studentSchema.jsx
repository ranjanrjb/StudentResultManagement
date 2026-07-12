import * as Yup from "yup";

const studentSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Minimum 3 characters"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  dateOfBirth: Yup.date().required("Date of Birth is required"),
});

export default studentSchema;
