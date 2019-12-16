import React from 'react';
import { render, cleanup } from '@testing-library/react';

import JobListing from './JobListing';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<JobListing />);
});