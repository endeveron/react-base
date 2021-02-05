import React from 'react'

import './Details.css'

const Details = ({ data }) => {
  const a = data.address
  return (
    <div className="details">
      Выбран пользователь <b>{ data.firstName } { data.lastName }</b><br />
      Описание:<br />
      <textarea className="desc" value={ data.description } readOnly></textarea>
      <br />
      Адрес: <b>{ a.streetAddress }</b><br />
      Город: <b>{ a.city }</b><br />
      Провинция: <b>{ a.state }</b><br />
      Индекс: <b>{ a.zip }</b><br />
    </div>
  );
};

export default Details;