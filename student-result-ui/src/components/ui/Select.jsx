import { Field, ErrorMessage } from "formik";

function Select({ label, name, options }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <Field
        as="select"
        name={name}
        className="
          w-full
          rounded-lg
          border
          border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          px-3
          py-2
          outline-none
          transition-colors duration-300
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-300
        "
      >
        <option value="">Select...</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      <ErrorMessage
        name={name}
        component="p"
        className="text-sm text-red-500"
      />
    </div>
  );
}

export default Select;
