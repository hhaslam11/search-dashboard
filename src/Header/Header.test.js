import React from 'react';
import { render } from '@testing-library/react';

import Header from './Header';

test('renders without crashing', () => {
  render(<Header />);
});
