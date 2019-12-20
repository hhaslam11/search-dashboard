import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Pagination from '../Pagination/Pagination';

storiesOf('Pagination', module)
  .add('no props (should be blank)', () => <Pagination/>)
  .add('with one page', () => <Pagination pages={1} onChange={() => {}} />)
  .add('with 3 pages', () => {
    return (
      <Pagination
        pages={3}
        onChange={() => {}}
      />
    )
  })
  .add('with pre-selected page (page 2)', () => {
    return (
      <Pagination
        pages={5}
        value={2}
        onChange={() => {}}
      />
    )
  })
  .add('with different render on each page', () => {
    const [state, setState] = useState(1);
    return (
      <>
        <p>page {state}</p>
        <Pagination
          onChange={val => setState(val)}
          pages={3}
        />
      </>
    )
  })
  .add('with 20 pages', () => {
    const [state, setState] = useState(1);
    return (
      <>
        <p>page {state}</p>
        <Pagination
          onChange={val => setState(val)}
          pages={20}
        />
      </>
    )
  });