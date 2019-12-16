import React, { useState, useEffect, useCallback } from 'react';

import useDebounce from '../hooks/useDebounce';
import './SearchBar.scss';

/**
 * Generic search bar
 * @param {string} props.placeholder override placeholder text | Default 'Search...'
 * @param {boolean} props.disabled disable the search bar | Default false
 * @param {function} props.onChange callback function that will run when value changes.
 * Current value is passed to it.
 * @param {number} props.timeout set amount of time (in ms) to wait before user stops
 * typing before triggering props.onChange | Default 0
 */
export default function SearchBar(props) {
  const [state, setState] = useState(props.value || '');
  const query = useDebounce(state, props.timeout || 0);

  const onChange = useCallback(props.onChange ? props.onChange : () => {}, []);

  useEffect(() => {
    onChange(query);
  }, [query, onChange]);

  return (
    <input
      className='search-bar'
      type='text'
      value={state}
      placeholder={props.placeholder || 'Search...'}
      disabled={props.disabled}
      onChange={event => setState(event.target.value)}
    />
  )
}