import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'

import './App.css'
import AddProduct from './components/AddProduct'
import Table from './components/Table'


function App() {
  const [tableData, setTableData] = useState([])


  useEffect(() => {
    axios({
      method: "get",
      url: "/api/get-data"
    }).then(function (response) {
      setTableData(response.data)
    })
  }, [])



  const columns = useMemo(
    () => [
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
    ],
    []
  )
  // const data = useMemo(() => tableData, [])

  console.log("__test",tableData)


  return (
    <div className="App">
      <div>hi</div>
      <div>
        <AddProduct/>
        <p><strong>Total Products: {tableData.length}</strong></p>
        <Table columns={columns} data={tableData} />

      </div>
    </div>
  )
}

export default App
