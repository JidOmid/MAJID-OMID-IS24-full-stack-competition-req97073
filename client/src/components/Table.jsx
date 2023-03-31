import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
} from "react-table";
import {useState, useMemo} from "react";

function GlobalFilter({preGlobalFilteredRows, globalFilter, setGlobalFilter}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

export default function Table({columns, data, setProductIndex, setShowEdit}) {
  const [filtered, setFiltered] = useState("all");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useFilters
  );

  return (
    <>
      <label htmlFor="filters">Filter by:</label>
      <input
        type="text"
        onChange={(e) => {
          filtered === "all"
            ? setGlobalFilter(e.target.value)
            : setFilter(filtered, e.target.value);
        }}
      />
      <select
        name="filters"
        id="filters"
        onChange={(e) => {
          setFiltered(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="productName">Product Name</option>
        <option value="scrumMasterName">Scrum Master</option>
        <option value="productOwnerName">Owner</option>
        <option value="Developers">Developers</option>
      </select>
      <span>
        <strong> Total Products: {rows.length}</strong>
      </span>
      <table {...getTableProps()} border="1">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "#") {
                    return (
                      <td {...cell.getCellProps()}>
                        {Number(cell.row.id) + 1}
                      </td>
                    );
                  }
                  if (cell.column.Header === "Edit") {
                    return (
                      <td {...cell.getCellProps()}>
                        <button
                          type="button"
                          onClick={() => {
                            setProductIndex(i);
                            setShowEdit(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    );
                  }
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
