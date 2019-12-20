import React, { useState } from 'react';

import './Pagination.scss';

/**
 * @param {function} props.onChange callback function when page is changed. current page is passed to it. <required>
 * @param {number} props.pages number of pages. <required>
 * @param {number} props.value current page
 */
export default props => {
  if (!props.onChange || !props.pages) return null;
  
  // Don't need to worry about any conditional rendering if theres only
  // a single page. All the fancy logic will be below this if block
  if (props.pages === 1) {
    return (
      <div className="pagination">
        <button disabled>prev</button>
        <button className="pagination-selected">1</button>
        <button disabled>next</button>
      </div>
    )
  }
  
  const [state, setState] = useState(props.value || 1);

  const prev = <button disabled={state === 1} onClick={() => onChange(state - 1)}>prev</button>
  const next = <button disabled={state === props.pages} onClick={() => onChange(state + 1)}>next</button>

  const onChange = val => {
    setState(val);
    props.onChange(val);
  };

  // figure out the range of button numbers to render
  let rangeMin, rangeMax;
  if (props.pages <= 5 || state <= 3) {
    rangeMin = 1;
    rangeMax = props.pages > 5 ? 5 : props.pages;
  } else if (state >= (props.pages - 2)) {
    rangeMin = props.pages - 4;
    rangeMax = props.pages;
  } else {
    rangeMin = state - 2;
    rangeMax = state + 2;
  }

  // generate buttons
  const buttons = [];
  for (let i = rangeMin; i <= rangeMax; i++) {
    buttons.push((
      <button
        onClick={() => onChange(i)}
        className={state === i && 'pagination-selected'}
      >
        {i}
      </button>
    ));
  }

  return (
    <div className="pagination">
      {prev}
      {buttons}
      {next}
    </div>
  )
};