import React from 'react';

import './ModeSelector.css'

const ModeSelector = props => {
  const smallListUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
  const bigListUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}&pretty=true`

  return (
    <div className="container p-4">
      <span className="mr-4">Выберите количество строк</span>
      <button
        onClick={ () => props.onSelect(smallListUrl) }
        className="btn btn-success mr-4">32</button>
      <button
        onClick={ () => props.onSelect(bigListUrl) }
        className="btn btn-info">1000</button>
    </div>
  );
};

export default ModeSelector;