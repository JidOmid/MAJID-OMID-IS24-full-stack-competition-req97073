import axios from "axios";
import {useState, useEffect, useMemo} from "react";

import "./App.css";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Table from "./components/Table";

function App() {
  const [tableData, setTableData] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [productIndex, setProductIndex] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/get-data",
    }).then(function (response) {
      setTableData(response.data);
    });
  }, [refreshList]);

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
        accessor: "Developers",
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
  // const data = useMemo(() => tableData, [])

  return (
    <div className="App">
      <div>
        <div>
          <AddProduct
            refreshList={refreshList}
            setRefreshList={setRefreshList}
          />
          <EditProduct
            refreshList={refreshList}
            setRefreshList={setRefreshList}
            setShowEdit={setShowEdit}
            showEdit={showEdit}
            product={tableData[productIndex]}
            style={{display: showEdit ? "" : "none"}}
          />
          <Table
            columns={columns}
            data={tableData}
            setProductIndex={setProductIndex}
            setShowEdit={setShowEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
