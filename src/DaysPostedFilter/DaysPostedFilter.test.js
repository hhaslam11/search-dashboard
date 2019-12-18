import React from 'react';
import { render } from '@testing-library/react';

import DaysPostedFilter from './DaysPostedFilter';

test('renders without crashing', () => {
  render(<DaysPostedFilter />);
});
