import React from 'react'

import './Details.css'

const Details = ({ data }) => {
  const a = data.address
  return (
    <div className="sticky">
      <div className="details">
        <div className="left">
          <span>Выбран</span><b>{ data.firstName } { data.lastName }</b><br />
          <span>Адрес</span><b>{ a.streetAddress }</b><br />
          <span>Город</span><b>{ a.city }</b><br />
          <span>Провинция</span><b>{ a.state }</b><br />
          <span>Индекс</span><b>{ a.zip }</b><br />
        </div>
        <div className="right">
          <span>Описание</span><br />
          <textarea rows="4" className="desc" value={ data.description } readOnly></textarea>
        </div>

      </div>
    </div>
  );
};

export default Details;