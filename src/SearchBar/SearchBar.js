import React from 'react';

import './SearchBar.scss';

export default function SearchBar(props) {
  return (
    <input
      className='search-bar'
      type='text'
      placeholder={props.placeholder || 'Search...'}
    />
  )
}