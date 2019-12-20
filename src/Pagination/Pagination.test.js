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

  //with onChange function but no pages value
  expect(Pagination({ onChange: () => {} })).toBeNull();
});

test('should render three buttons given one page', () => {
  const { queryByDisplayValue } = render(<Pagination pages={1}/>);
  expect(queryByDisplayValue('1')).not.toBeNull();
  expect(queryByDisplayValue(PREV)).not.toBeNull();
  expect(queryByDisplayValue(NEXT)).not.toBeNull();
});

test('should render five buttons given three pages (prev, 1, 2, 3, next)', () => {
  const { queryByDisplayValue } = render(<Pagination pages={3}/>);
  expect(queryByDisplayValue('1')).not.toBeNull();
  expect(queryByDisplayValue('2')).not.toBeNull();
  expect(queryByDisplayValue('3')).not.toBeNull();
  expect(queryByDisplayValue(PREV)).not.toBeNull();
  expect(queryByDisplayValue(NEXT)).not.toBeNull();
});

test('should start on first page', () => {
  const { queryByDisplayValue } = render(<Pagination pages={3}/>);
  expect(queryByDisplayValue('1')).toHaveClass(SELECTED);
  expect(queryByDisplayValue('2')).not.toHaveClass(SELECTED);
  expect(queryByDisplayValue('3')).not.toHaveClass(SELECTED);
  expect(queryByDisplayValue(PREV)).not.toHaveClass(SELECTED);
  expect(queryByDisplayValue(NEXT)).not.toHaveClass(SELECTED);
});

test('should start on second page if specified', () => {
  const { queryByDisplayValue } = render(<Pagination pages={3}/>);
  expect(queryByDisplayValue('1')).not.toHaveClass(SELECTED);
  expect(queryByDisplayValue('2')).toHaveClass(SELECTED);
  expect(queryByDisplayValue('3')).not.toHaveClass(SELECTED);
  expect(queryByDisplayValue(PREV)).not.toHaveClass(SELECTED);
  expect(queryByDisplayValue(NEXT)).not.toHaveClass(SELECTED);
});

test('onChange callback should run on page change', () => {
  const mock = jest.fn();
  const { getByDisplayValue } = render(<Pagination pages={3} onChange={val => mock(val)}/>);

  expect(mock).toHaveBeenCalledTimes(0);
  fireEvent.click(getByDisplayValue(NEXT));
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
  const { queryByDisplayValue } = render(<Pagination pages={10}/>);
  expect(queryByDisplayValue('1')).not.toBeNull();
  expect(queryByDisplayValue('2')).not.toBeNull();
  expect(queryByDisplayValue('3')).not.toBeNull();
  expect(queryByDisplayValue('4')).not.toBeNull();
  expect(queryByDisplayValue('5')).not.toBeNull();
  expect(queryByDisplayValue(PREV)).not.toBeNull();
  expect(queryByDisplayValue(NEXT)).not.toBeNull();

  //should only render after clicking through more pages
  expect(queryByDisplayValue('6')).toBeNull();
  expect(queryByDisplayValue('7')).toBeNull();
  expect(queryByDisplayValue('8')).toBeNull();
  expect(queryByDisplayValue('9')).toBeNull();
  expect(queryByDisplayValue('10')).toBeNull();
});

test('selected page should be in the middle if more than 5 pages', () => {
  const { queryByDisplayValue, getByDisplayValue } = render(<Pagination pages={10}/>);
  
  // should look like this.
  // [visible] | not visible
  // [prev] [*1*] [2] [3] [4] [5] [next] 6 7 8 9 10
  expect(queryByDisplayValue('1')).toHaveClass(SELECTED);
  expect(queryByDisplayValue('6')).toBeNull();
  fireEvent.click(getByDisplayValue(NEXT));
  fireEvent.click(getByDisplayValue(NEXT));
  fireEvent.click(getByDisplayValue(NEXT));

  // 1 [prev] [2] [3] [*4*] [5] [6] [next] 7 8 9 10
  expect(queryByDisplayValue('4')).toHaveClass(SELECTED);
  expect(queryByDisplayValue('1')).toBeNull();
  expect(queryByDisplayValue('2')).not.toBeNull();
  expect(queryByDisplayValue('3')).not.toBeNull();
  expect(queryByDisplayValue('4')).not.toBeNull();
  expect(queryByDisplayValue('5')).not.toBeNull();
  expect(queryByDisplayValue('6')).not.toBeNull();
  expect(queryByDisplayValue('7')).toBeNull();
  expect(queryByDisplayValue('8')).toBeNull();
  expect(queryByDisplayValue('9')).toBeNull();
  expect(queryByDisplayValue('10')).toBeNull();
  expect(queryByDisplayValue(PREV)).not.toBeNull();
  expect(queryByDisplayValue(NEXT)).not.toBeNull();
});

test('should go to next page when "next" is clicked', () => {
  const { getByDisplayValue, queryByDisplayValue } = render(<Pagination pages={3} />);
  
  expect(queryByDisplayValue('1')).toHaveClass(SELECTED);
  fireEvent.click(getByDisplayValue(NEXT));
  expect(queryByDisplayValue('2')).toHaveClass(SELECTED);
});

test('should go back a page when "prev" is clicked', () => {
  const { getByDisplayValue, queryByDisplayValue } = render(<Pagination pages={3} value={2}/>);
  
  expect(queryByDisplayValue('2')).toHaveClass(SELECTED);
  fireEvent.click(getByDisplayValue(PREV));
  expect(queryByDisplayValue('1')).toHaveClass(SELECTED);
});

test('should go to page that is clicked', () => {
  const { getByDisplayValue, queryByDisplayValue } = render(<Pagination pages={3}/>);

  expect(queryByDisplayValue('1')).toHaveClass(SELECTED);
  fireEvent.click(getByDisplayValue('3'));
  expect(queryByDisplayValue('3')).toHaveClass(SELECTED);
});