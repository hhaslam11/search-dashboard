import React from 'react';
import { render, cleanup } from '@testing-library/react';

import JobListing from './JobListing';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<JobListing />);
});

test.skip('should skip render if right information isnt passed', () => {});
test.skip('should render with all info passed', () => {});
test.skip('should not link to company if no url is avaliable', () => {});
test.skip('should link to company if link is avaliable', () => {});
test.skip('should display properly if city isnt avaliable', () => {});
test.skip('should display properly if country isnt avaliable', () => {});
test.skip('should display properly if country or city isnt avaliable', () => {});
test.skip('should only display one number if min and max salary are the same', () => {});
test.skip('should display salary range if min and max are different', () => {});
test.skip('should not display salary if not avaliable', () => {});