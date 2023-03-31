import {useTable, useGlobalFilter, useFilters} from "react-table";
import {useState, useMemo} from "react";

export default function Table({columns, data, setProductIndex, setShowEdit}) {
  const [filtered, setFiltered] = useState("all");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
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
      <div className="Table-Search-Wrapper">
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
        <input
          className="Table-Search-Bar"
          placeholder="Search"
          type="text"
          onChange={(e) => {
            filtered === "all"
              ? setGlobalFilter(e.target.value)
              : setFilter(filtered, e.target.value);
          }}
        />
        <span style={{marginLeft: "5px"}}>
          <strong> Total Products: {rows.length}</strong>
        </span>
      </div>
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
                        <img
                          src="/pen.svg"
                          className="pen"
                          type="button"
                          onClick={() => {
                            setProductIndex(cell.row.id);
                            setShowEdit(true);
                          }}
                        />
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
