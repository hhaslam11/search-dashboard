import React from 'react';

import './RadiusFilter.scss';

/**
 * Range slider from 1-5 (default 5)
 * @param {function} props.onChange callback function with new value passed to it. <required>
 */
export default (props) => {
  if (!props.onChange) return null;

  return (
    <input type="range"
      onChange={event => props.onChange(event.target.value)}
      min={1}
      max={5}
    />
  )
}