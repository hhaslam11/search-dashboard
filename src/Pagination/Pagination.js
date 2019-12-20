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

  const onChange = val => {
    setState(val);
    props.onChange(val);
  };

  // if props.pages is <= 5, then we dont have to dynamically render the boxes.
  // thats what this block is for.
  if (props.pages <= 5) {
    const buttons = [];
    
    for (let i = 1; i <= props.pages; i++) {
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
        <button disabled={state === 1} onClick={() => onChange(state - 1)}>prev</button>
        {buttons}
        <button disabled={state === props.pages} onClick={() => onChange(state + 1)}>next</button>
      </div>
    )
  }

  //if > 5, will be more difficult
  return (
    <h5>Pagination</h5>
  )
};