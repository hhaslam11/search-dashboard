import React from 'react';

import './SearchBar.scss';

/**
 * Generic search bar
 * @param {string} props.placeholder override placeholder text | Default 'Search...'
 * @param {boolean} props.disabled disable the search bar | Default false
 */
export default function SearchBar(props) {
  return (
    <input
      className='search-bar'
      type='text'
      placeholder={props.placeholder || 'Search...'}
      disabled={props.disabled}
    />
  )
}