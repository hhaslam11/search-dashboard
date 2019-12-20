import React from 'react';
import { render } from '@testing-library/react';

import Pagination from './Pagination';

test('renders without crashing', () => {
  render(<Pagination/>);
});

test.skip('should return null with invalid props', () => {});
test.skip('should render three buttons given one page', () => {});
test.skip('should render five buttons given three pages (prev, 1, 2, 3, next)', () => {});
test.skip('should start one first page', () => {});
test.skip('onChange callback should run on page change', () => {});
test.skip('should only render up to 7 buttons at once', () => {});
test.skip('should go to next page when "next" is clicked', () => {});
test.skip('should go back a page when "prev" is clicked', () => {});
test.skip('prev and next buttons should be disabled if only one page', () => {});
test.skip('current page should be disabled', () => {});