import React from 'react';
import { storiesOf } from '@storybook/react';

import Pagination from '../Pagination/Pagination';

storiesOf('Pagination', module)
  .add('no props (should be blank)', () => <Pagination/>)
  .add('with one page', () => {
    return (
      <Pagination
      />
    )
  })
  .add('with 3 pages', () => {
    return (
      <Pagination
      />
    )
  })
  .add('with different render on each page', () => {
    return (
      <Pagination
      />
    )
  })
  .add('with 20 pages', () => {
    return (
      <Pagination
      />
    )
  });