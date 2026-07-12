import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Input, Select } from "./ui";

function DynamicForm({
  initialValues,
  validationSchema,
  fields,
  editing,
  onCancel,
  onSubmit,
  entityName,
}) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {" "}
            {fields.map((field) => (
              <div>
                {field.type === "select" ? (
                  <Select
                    label={field.label}
                    name={field.name}
                    options={field.options}
                  />
                ) : (
                  <Input
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" variant="warning" disabled={isSubmitting}>
              {editing ? `Update ${entityName}` : `Add ${entityName}`}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                resetForm();
                onCancel();
              }}
            >
              Clear
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default DynamicForm;
