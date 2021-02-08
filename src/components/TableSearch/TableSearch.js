import React, { useState } from 'react';

import './TableSearch.css'

const TableSearch = props => {
  const [value, setValue] = useState('')

  const valueHandler = e => {
    setValue(e.target.value)
  }

  return (
    <div className="input-group my-4">
      <input
        type="text"
        className="form-control"
        value={ value }
        onChange={ valueHandler } />
      <div className="input-group-append">
        <button
          onClick={ () => props.onSearch(value) }
          className="btn btn-primary" >Search</button>
      </div>
    </div>
  );
};

export default TableSearch;