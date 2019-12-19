import React from 'react';
import { render } from '@testing-library/react';

import RadiusFilter from '../RadiusFilter/RadiusFilter';

test('renders without crashing', () => {
  render(<RadiusFilter />);
});

test('renders without crashing with a onChange callback function', () => {
  render(<RadiusFilter onChange={val => val}/>);
});

test('returns null if no props are passed', () => {
  expect(RadiusFilter({})).toBeNull();
  expect(RadiusFilter({onChange: () => {}})).not.toBeNull();  
});
