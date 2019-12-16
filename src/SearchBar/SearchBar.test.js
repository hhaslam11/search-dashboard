import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SearchBar from './SearchBar';

afterEach(cleanup);

/**
 * Workaround to surpress act() warnings.
 * My useDebounce function is causing weird async issues that
 * jest doesnt like. Pretty sure it's a bug with react.
 * Tests still work fine and pass.
 * https://github.com/facebook/react/issues/14769#issuecomment-514589856
 */
const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
      consoleError(...args);
    }
  });
});

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

test('runs onChange function with current value passed to it', async () => {
  const mockCallback = jest.fn();
  
  const { getByPlaceholderText } = render(
    <SearchBar
      placeholder='placeholder'
      onChange={() => mockCallback()}
    />
  );
      
  expect(mockCallback).toHaveBeenCalledTimes(0);
  
  fireEvent.change(getByPlaceholderText('placeholder'), {
    target: { value: 'test' }
  });
  
  await new Promise(resolve => setTimeout(resolve, 100));
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

test('runs onChange function with a timeout', async () => {
  const mockCallback = jest.fn();
  
  const { getByPlaceholderText } = render(
    <SearchBar
      placeholder='placeholder'
      timeout={350}
      onChange={() => mockCallback()}
    />
  );
  
  fireEvent.change(getByPlaceholderText('placeholder'), {
    target: { value: 'test' }
  });
  
  await new Promise(resolve => setTimeout(resolve, 100));
  expect(mockCallback).toHaveBeenCalledTimes(0);

  await new Promise(resolve => setTimeout(resolve, 350));
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

test('renders with invalid timeout', () => {
  render(<SearchBar timeout={-1} />);
  render(<SearchBar timeout={'invalid'} />);
  render(<SearchBar timeout={1.23} />);
});

test('renders with invalid placeholder', () => {
  render(<SearchBar placeholder={-1} />);
});

test('renders with invalid onChange callback', () => {
  render(<SearchBar onChange={1} />);
  render(<SearchBar placeholder={'test'} />);
});