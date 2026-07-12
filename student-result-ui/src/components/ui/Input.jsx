import { Field, ErrorMessage } from "formik";

function Input({ label, name, type = "text", placeholder = "" }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="
          w-full
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
          focus:ring-blue-300
        "
      />

      <ErrorMessage
        name={name}
        component="p"
        className="text-sm text-red-500"
      />
    </div>
  );
}

export default Input;
