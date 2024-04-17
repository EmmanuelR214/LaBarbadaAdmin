import { useTable } from "react-table";

export const TablaComponentes = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <table {...getTableProps()} className="w-full   text-center">
        {/* Table Header */}
        <thead className="bg-stone-800">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="p-3"
                  style={{ width: column.width }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table Body */}
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                className={`hover:bg-gray-600 ${
                  rowIndex % 2 === 0 ? "" : "bg-red-600 bg-opacity-20"
                }`}
              >
                {row.cells.map((cell) => (
                  <td key={cell.id} {...cell.getCellProps()} className="p-3">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};