import { Button } from "./ui";

function DynamicTable({
  data,
  columns,
  keyField,
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className="px-4 py-3 md:px-6 md:py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700"
                >
                  {column.header}
                </th>
              ))}

              {(onEdit || onDelete) && (
                <th className="px-4 py-3 md:px-6 md:py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <div className="flex flex-wrap gap-2">{emptyMessage}</div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row[keyField]}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.header}
                      className="px-4 py-3 md:px-8 md:py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <div className="flex flex-wrap gap-2">
                        {column.render
                          ? column.render(row, index)
                          : row[column.accessor]}
                      </div>
                    </td>
                  ))}

                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 md:px-8 md:py-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex flex-wrap justify-center gap-2">
                        {onEdit && (
                          <Button variant="primary" onClick={() => onEdit(row)}>
                            Edit
                          </Button>
                        )}

                        {onDelete && (
                          <Button
                            variant="danger"
                            onClick={() => onDelete(row[keyField])}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynamicTable;
