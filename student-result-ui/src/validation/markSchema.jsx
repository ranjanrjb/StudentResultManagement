import * as Yup from "yup";

const markSchema = Yup.object({
  studentId: Yup.number().required("Please select a student"),

  subjectName: Yup.string()
    .required("Subject is required")
    .min(2, "Subject name must be at least 2 characters"),

  score: Yup.number()
    .required("Score is required")
    .min(0, "Score cannot be less than 0")
    .max(100, "Score cannot be more than 100"),
});

export default markSchema;
