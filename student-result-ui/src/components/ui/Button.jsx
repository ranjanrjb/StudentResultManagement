const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-400",

  danger:
    "bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-400",

  warning:
    "bg-amber-500 hover:bg-amber-600 text-white dark:bg-white dark:text-black dark:hover:bg-gray-300 focus:ring-2 focus:ring-amber-400",

  secondary:
    "bg-gray-500 hover:bg-gray-600 text-white dark:bg-gray-600 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-400",
};

function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        px-4 py-2
        rounded-lg
        font-medium
        transition-all
        duration-200
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus:outline-none
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
