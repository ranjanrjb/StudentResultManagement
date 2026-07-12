function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white dark:bg-zinc-900
        rounded-xl
        shadow-md
        border border-gray-200 dark:border-zinc-800
        transition-colors duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {children}
      </h2>
    </div>
  );
}

function CardBody({ children }) {
  return <div className="p-6 md:p-8">{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
