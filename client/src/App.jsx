import axios from "axios";
import {useState, useEffect, useMemo} from "react";

import "./App.css";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";
import Table from "./components/Table";

function App() {
  const [tableData, setTableData] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [productIndex, setProductIndex] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [postError, setPostError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //get request on first page render and any time refresh list is updated
  useEffect(() => {
    axios({
      url: "/api/get-data",
    })
      .then(function (response) {
        setTableData(response.data);
        setPostError(false);
      })
      .catch(function (error) {
        setPostError(true);
        setErrorMessage("Internal Server Error. Could not load data.");
      });
  }, [refreshList]);

  //memoized columns for react-table library
  const columns = useMemo(
    () => [
      {
        Header: "#",
      },
      {
        Header: "Product",
        accessor: "productName",
      },
      {
        Header: "Scrum Master",
        accessor: "scrumMasterName",
      },
      {
        Header: "Owner",
        accessor: "productOwnerName",
      },
      {
        Header: "Developers",
        accessor: (tableData) => {
          return tableData.Developers.map((dev, i, {length}) => {
            return `${dev}${i + 1 === length ? "" : ", "}`;
          });
        },
      },
      {
        Header: "Start Date",
        accessor: "startDate",
      },
      {
        Header: "Methodology",
        accessor: "methodology",
      },
      {
        Header: "Edit",
      },
    ],
    []
  );

  return (
    <div className="App">
      <div className="Header">IS-24 Submission</div>
      <div className="Add-Product-Button">
        <button type="button" onClick={() => setShowAdd(true)}>
          Add Product
        </button>
      </div>
      <AddProductModal
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
      <EditProductModal
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        product={tableData[productIndex]}
      />
      <div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <div className="Table-Wrapper">
            <Table
              columns={columns}
              data={tableData}
              setProductIndex={setProductIndex}
              setShowEdit={setShowEdit}
            />
            {postError ? <span>{errorMessage}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
