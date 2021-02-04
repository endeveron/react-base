import React, { useEffect, useState } from 'react'

import Loader from './shared/components/Loader/Loader'
import Table from './components/Table/Table'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [sortDescField, setSortDescField] = useState(null)

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

  const tableClickHandler = e => {
    const sortId = e.target.getAttribute('sort')
    sortId && sortData(sortId)

    // TODO: NEXT STEP

  }

  return (
    <div className="container">

      { isLoading
        ? <Loader />
        : <Table
          onClick={ tableClickHandler }
          data={ data } />
      }

    </div>
  )
}

export default App;
