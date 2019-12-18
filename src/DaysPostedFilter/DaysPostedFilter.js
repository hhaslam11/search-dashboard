import React from 'react';

import './DaysPostedFilter.scss';

/**
 * @param {function} props.onChange callback function that gets passed the value
 * of the option. 
 * Options will be 1-4, as follows
 * 1 - posted anytime
 * 2 - posted today
 * 3 - posted in the past week
 * 4 - posted in the past month
 */
export default (props) => {
  if (!props.onChange) return null;

  return (
    <select
      onChange={event => props.onChange(event.target.value)}
      className="posted-menu"
    >
      <option value={1}>Posted anytime</option>
      <option value={2}>Posted today</option>
      <option value={3}>Posted in the past week</option>
      <option value={4}>Posted in the past month</option>
    </select>
  )
};