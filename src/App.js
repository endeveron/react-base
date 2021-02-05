import React, { useState } from 'react'

import Loader from './components/Loader/Loader'
import Table from './components/Table/Table'
import Details from './components/Details/Details'
import ModeSelector from './components/ModeSelector/ModeSelector'

function App() {
  const [modeSelected, setModeSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [sortDescField, setSortDescField] = useState(null)
  const [rowDetails, setRowDetails] = useState()

  const fetchData = async (url) => {
    try {
      setIsLoading(true)
      const res = await fetch(url)
      const data = await res.json()
      setData(data)
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false)
    }
  }

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

  const sortHandler = e => {
    const sortId = e.target.getAttribute('sort')
    sortId && sortData(sortId)
  }

  const rowSelectHandler = rowData => {
    setRowDetails(rowData)
  }

  const modeSelectedHandler = url => {
    setModeSelected(true)
    fetchData(url)
  }

  return (
    <div className="container">

      { !modeSelected
        ? <ModeSelector onSelect={ modeSelectedHandler } />
        : (
          <Table
            onSort={ sortHandler }
            onRowSelect={ rowSelectHandler }
            data={ data } />
        )
      }

      { isLoading && <Loader /> }

      { rowDetails && <Details data={ rowDetails } /> }

    </div>
  )
}

export default App;
