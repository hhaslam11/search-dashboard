import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders without crashing', () => {
  render(<SearchBar />);
});

test('renders with placeholder text', () => {
  const { getByPlaceholderText } = render(<SearchBar placeholder='Test Placeholder'/>);
  expect(getByPlaceholderText('Test Placeholder')).toBeInTheDocument();  
});

test('renders with custome value', () => {
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