import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

import './App.css'

import Loader from './components/Loader/Loader'
import Table from './components/Table/Table'
import Details from './components/Details/Details'
import ModeSelector from './components/ModeSelector/ModeSelector'
import TableSearch from './components/TableSearch/TableSearch'

function App() {
  const PAGE_SIZE = 10

  const [modeSelected, setModeSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [sortDescField, setSortDescField] = useState(null)
  const [rowDetails, setRowDetails] = useState()
  const [currentPage, setCurrentPage] = useState({ selected: 0 })
  const [search, setSearch] = useState()

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

  const searchHandler = v => {
    setSearch(v)
    setCurrentPage({ selected: 0 })
  }

  const chunk = (arr, chunk) => {
    const res = []
    for (let i = 0, l = arr.length;i < l;i += chunk) {
      res.push(arr.slice(i, i + chunk))
    }
    return res
  }

  const getFilteredData = () => {
    if (!search) return data
    const _check = (item, name) => item[name].toLowerCase().includes(search.toLowerCase())
    return data.filter(item =>
      _check(item, 'firstName') ||
      _check(item, 'lastName') ||
      _check(item, 'email')
    )
  }

  const filteredData = getFilteredData()

  const dispData = chunk(filteredData, PAGE_SIZE)[currentPage.selected]

  return (
    <div className="container">

      { !modeSelected
        ? <ModeSelector onSelect={ modeSelectedHandler } />
        : (
          <>
            <TableSearch onSearch={ searchHandler } />
            <Table
              onSort={ sortHandler }
              onRowSelect={ rowSelectHandler }
              data={ dispData } />

            { !!data.length && data.length > PAGE_SIZE && <ReactPaginate
              previousLabel={ 'previous' }
              nextLabel={ 'next' }
              breakLabel={ ' . . . ' }
              breakClassName={ 'break-me' }
              pageCount={ Math.ceil(filteredData.length / PAGE_SIZE) || 1 }
              marginPagesDisplayed={ 2 }
              pageRangeDisplayed={ 5 }
              onPageChange={ pageClickHandler }
              forcePage={ currentPage.selected }
              containerClassName={ 'pagination py-2' }
              activeClassName={ 'active' }
              pageClassName={ 'page-item' }
              pageLinkClassName={ 'page-link' }
              previousClassName={ 'page-item' }
              previousLinkClassName={ 'page-link' }
              nextClassName={ 'page-item' }
              nextLinkClassName={ 'page-link' } />
            }
          </>
        )
      }

      { isLoading && <Loader /> }

      { rowDetails && <Details data={ rowDetails } /> }

    </div>
  )
}

export default App;
