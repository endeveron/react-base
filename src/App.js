import React, { useEffect, useState } from 'react'

import Loader from './shared/components/Loader/Loader'
import Table from './components/Table/Table'
import Details from './components/Details/Details'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [sortDescField, setSortDescField] = useState(null)
  const [rowDetails, setRowDetails] = useState(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
      setIsLoading(false)
      const data = await res.json()
      setData(data)

    } catch (err) {
      setIsLoading(false)
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const sortData = sortId => {
    const sortedData = [...data].sort((a, b) =>
      // is it a second click on the same field ?
      (sortDescField === sortId
        ? a[sortId] < b[sortId]  // sort desc
        : a[sortId] > b[sortId]  // sort asc
      ) ? 1 : -1)
    setSortDescField(sortId)
    setData(sortedData)
  }

  const onSortHandler = e => {
    const sortId = e.target.getAttribute('sort')
    sortId && sortData(sortId)
  }

  const onRowSelectHandler = rowData => {
    setRowDetails(rowData)
  }

  return (
    <div className="container">

      { isLoading
        ? <Loader />
        : (
          <Table
            onSort={ onSortHandler }
            onRowSelect={ onRowSelectHandler }
            data={ data } />
        )
      }

      { !isLoading && rowDetails && <Details data={ rowDetails } /> }

    </div>
  )
}

export default App;
