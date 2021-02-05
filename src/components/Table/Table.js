import React from 'react';

import './Table.css'

const Table = props => {

  return (
    <table className="table">
      <thead>
        <tr onClick={ props.onSort }>
          <th sort="id">ID</th>
          <th sort="firstName">FirstName</th>
          <th sort="lastName">LastName</th>
          <th sort="email">Email</th>
          <th sort="phone">Phone</th>
        </tr>
      </thead>
      <tbody>
        { props.data.map(i => (
          // don't pass an event argument (e) to bind a custom property
          <tr key={ i.id + i.firstName } onClick={ () => props.onRowSelect(i) }>
            <td>{ i.id }</td>
            <td>{ i.firstName }</td>
            <td>{ i.lastName }</td>
            <td>{ i.email }</td>
            <td>{ i.phone }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
};

export default Table;