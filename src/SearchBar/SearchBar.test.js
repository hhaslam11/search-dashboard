import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SearchBar from './SearchBar';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<SearchBar />);
});

test('renders with placeholder text', () => {
  const { getByPlaceholderText } = render(<SearchBar placeholder='Test Placeholder'/>);
  expect(getByPlaceholderText('Test Placeholder')).toBeInTheDocument();  
});

test('renders with custom value', () => {
  const { queryByDisplayValue } = render(<SearchBar value='hello'/>);
  expect(queryByDisplayValue('hello')).toBeInTheDocument();
});

test('types in the search bar', () => {
  const { getByPlaceholderText, queryByDisplayValue } = render(<SearchBar placeholder='placeholder'/>);

  fireEvent.change(getByPlaceholderText('placeholder'), {
    target: { value: 'Hello' }
  });

  expect(queryByDisplayValue('Hello')).not.toBeNull();
});

test.skip('runs onChange function with current value passed to it', (done) => {
  const mockCallback = jest.fn();
  const cb = () => {
    mockCallback();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    done();
  };

  const { getByPlaceholderText } = render(
    <SearchBar
      placeholder='placeholder'
      onChange={() => cb()}
    />
  );

  expect(mockCallback).toHaveBeenCalledTimes(0);

  fireEvent.change(getByPlaceholderText('placeholder'), {
    target: { value: 'test' }
  });
});

test.skip('runs onChange function with a delay', () => {});