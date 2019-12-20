import React from 'react';
import { render } from '@testing-library/react';

import Pagination from './Pagination';

test('renders without crashing', () => {
  render(<Pagination/>);
});