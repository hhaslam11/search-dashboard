import React from 'react';
import { render } from '@testing-library/react';

import DaysPostedFilter from './DaysPostedFilter';

test('renders without crashing', () => {
  render(<DaysPostedFilter />);
});

test('renders without crashing with a onChange callback function', () => {
  render(<DaysPostedFilter onChange={val => val}/>);
});

test('returns null if no props are passed', () => {
  expect(DaysPostedFilter({})).toBeNull();
  expect(DaysPostedFilter({onChange: () => {}})).not.toBeNull();  
});
