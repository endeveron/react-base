import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

import './App.css'

import Loader from './components/Loader/Loader'
import Table from './components/Table/Table'
import Details from './components/Details/Details'
import ModeSelector from './components/ModeSelector/ModeSelector'

function App() {
  const PAGE_SIZE = 10

  const [modeSelected, setModeSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [sortDescField, setSortDescField] = useState(null)
  const [rowDetails, setRowDetails] = useState()
  const [currentPage, setCurrentPage] = useState({ selected: 0 })

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

  const pageClickHandler = page => {
    setCurrentPage(page)
  }

  const chunk = (arr, chunk) => {
    const res = []
    for (let i = 0, l = arr.length;i < l;i += chunk) {
      res.push(arr.slice(i, i + chunk))
    }
    return res
  }

  const dispData = chunk(data, PAGE_SIZE)[currentPage.selected]

  return (
    <div className="container py-2">

      { !!data.length && data.length > PAGE_SIZE && <div className="py-3">
        <ReactPaginate
          previousLabel={ 'previous' }
          nextLabel={ 'next' }
          breakLabel={ ' . . . ' }
          breakClassName={ 'break-me' }
          pageCount={ Math.ceil(data.length / PAGE_SIZE) || 1 }
          marginPagesDisplayed={ 2 }
          pageRangeDisplayed={ 5 }
          onPageChange={ pageClickHandler }
          // forcePage={ currentPage }
          containerClassName={ 'pagination' }
          activeClassName={ 'active' }
          pageClassName={ 'page-item' }
          pageLinkClassName={ 'page-link' }
          previousClassName={ 'page-item' }
          previousLinkClassName={ 'page-link' }
          nextClassName={ 'page-item' }
          nextLinkClassName={ 'page-link' } />
      </div> }

      { !modeSelected
        ? <ModeSelector onSelect={ modeSelectedHandler } />
        : (
          <Table
            onSort={ sortHandler }
            onRowSelect={ rowSelectHandler }
            data={ dispData } />
        )
      }

      { isLoading && <Loader /> }

      { rowDetails && <Details data={ rowDetails } /> }

    </div>
  )
}

export default App;
