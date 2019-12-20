import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Pagination from './Pagination';

// values that may be subject to change
const SELECTED = 'pagination-selected';
const PREV = 'prev';
const NEXT = 'next';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<Pagination/>);
});

test('should return null with invalid props', () => {
  expect(Pagination({})).toBeNull();
  expect(Pagination({ onChange: () => {} })).toBeNull();
  expect(Pagination({ pages: 3 })).toBeNull();
});

test('should render three buttons given one page', () => {
  const { queryByText } = render(<Pagination pages={1} onChange={() => {}}/>);
  expect(queryByText('1')).not.toBeNull();
  expect(queryByText(PREV)).not.toBeNull();
  expect(queryByText(NEXT)).not.toBeNull();
});

test('should render five buttons given three pages (prev, 1, 2, 3, next)', () => {
  const { queryByText } = render(<Pagination pages={3} onChange={() => {}}/>);
  expect(queryByText('1')).not.toBeNull();
  expect(queryByText('2')).not.toBeNull();
  expect(queryByText('3')).not.toBeNull();
  expect(queryByText(PREV)).not.toBeNull();
  expect(queryByText(NEXT)).not.toBeNull();
});

test('should start on first page', () => {
  const { queryByText } = render(<Pagination pages={3} onChange={() => {}}/>);
  expect(queryByText('1')).toHaveClass(SELECTED);
  expect(queryByText('2')).not.toHaveClass(SELECTED);
  expect(queryByText('3')).not.toHaveClass(SELECTED);
  expect(queryByText(PREV)).not.toHaveClass(SELECTED);
  expect(queryByText(NEXT)).not.toHaveClass(SELECTED);
});

test('should start on second page if specified', () => {
  const { queryByText } = render(<Pagination pages={3} value={2} onChange={() => {}}/>);
  expect(queryByText('1')).not.toHaveClass(SELECTED);
  expect(queryByText('2')).toHaveClass(SELECTED);
  expect(queryByText('3')).not.toHaveClass(SELECTED);
  expect(queryByText(PREV)).not.toHaveClass(SELECTED);
  expect(queryByText(NEXT)).not.toHaveClass(SELECTED);
});

test('onChange callback should run on page change', () => {
  const mock = jest.fn();
  const { getByText } = render(<Pagination pages={3} onChange={val => mock(val)}/>);

  expect(mock).toHaveBeenCalledTimes(0);
  fireEvent.click(getByText(NEXT));
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith(2);
});

test('onChange callback should not run if no change', () => {
  const mock = jest.fn();
  render(<Pagination pages={3} onChange={val => mock(val)}/>);

  expect(mock).toHaveBeenCalledTimes(0);
});

test('onChange callback should not run if no change and specified starting point', () => {
  const mock = jest.fn();
  render(<Pagination pages={3} value={2} onChange={val => mock(val)}/>);

  expect(mock).toHaveBeenCalledTimes(0);
});

test('should only render up to 7 buttons at once', () => {
  const { queryByText } = render(<Pagination pages={10} onChange={() => {}}/>);
  expect(queryByText('1')).not.toBeNull();
  expect(queryByText('2')).not.toBeNull();
  expect(queryByText('3')).not.toBeNull();
  expect(queryByText('4')).not.toBeNull();
  expect(queryByText('5')).not.toBeNull();
  expect(queryByText(PREV)).not.toBeNull();
  expect(queryByText(NEXT)).not.toBeNull();

  //should only render after clicking through more pages
  expect(queryByText('6')).toBeNull();
  expect(queryByText('7')).toBeNull();
  expect(queryByText('8')).toBeNull();
  expect(queryByText('9')).toBeNull();
  expect(queryByText('10')).toBeNull();
});

test('selected page should be in the middle if more than 5 pages', () => {
  const { queryByText, getByText } = render(<Pagination pages={10} onChange={() => {}}/>);
  
  // should look like this.
  // [visible] | not visible
  // [prev] [*1*] [2] [3] [4] [5] [next] 6 7 8 9 10
  expect(queryByText('1')).toHaveClass(SELECTED);
  expect(queryByText('6')).toBeNull();
  fireEvent.click(getByText(NEXT));
  fireEvent.click(getByText(NEXT));
  fireEvent.click(getByText(NEXT));

  // 1 [prev] [2] [3] [*4*] [5] [6] [next] 7 8 9 10
  expect(queryByText('4')).toHaveClass(SELECTED);
  expect(queryByText('1')).toBeNull();
  expect(queryByText('2')).not.toBeNull();
  expect(queryByText('3')).not.toBeNull();
  expect(queryByText('4')).not.toBeNull();
  expect(queryByText('5')).not.toBeNull();
  expect(queryByText('6')).not.toBeNull();
  expect(queryByText('7')).toBeNull();
  expect(queryByText('8')).toBeNull();
  expect(queryByText('9')).toBeNull();
  expect(queryByText('10')).toBeNull();
  expect(queryByText(PREV)).not.toBeNull();
  expect(queryByText(NEXT)).not.toBeNull();
});

test('should go to next page when "next" is clicked', () => {
  const { getByText, queryByText } = render(<Pagination pages={3} onChange={() => {}} />);
  
  expect(queryByText('1')).toHaveClass(SELECTED);
  fireEvent.click(getByText(NEXT));
  expect(queryByText('2')).toHaveClass(SELECTED);
});

test('should go back a page when "prev" is clicked', () => {
  const { getByText, queryByText } = render(<Pagination pages={3} value={2} onChange={() => {}}/>);
  
  expect(queryByText('2')).toHaveClass(SELECTED);
  fireEvent.click(getByText(PREV));
  expect(queryByText('1')).toHaveClass(SELECTED);
});

test('should go to page that is clicked', () => {
  const { getByText, queryByText } = render(<Pagination pages={3} onChange={() => {}}/>);

  expect(queryByText('1')).toHaveClass(SELECTED);
  fireEvent.click(getByText('3'));
  expect(queryByText('3')).toHaveClass(SELECTED);
});