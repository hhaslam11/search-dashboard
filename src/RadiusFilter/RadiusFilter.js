import React from 'react';

import './RadiusFilter.scss';

/**
 * Range slider from 0-10 (default 10)
 * @param {function} props.onChange callback function with new value passed to it. <required>
 */
export default (props) => {
  if (!props.onChange) return null;

  return (
    <input type="range"
      onChange={event => props.onChange(event.target.value)}
      min={0}
      max={10}
    />
  )
}