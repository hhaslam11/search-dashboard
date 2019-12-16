import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import SearchBar from '../SearchBar/SearchBar';

storiesOf('Search Bar', module)
  .add('Basic', () => <SearchBar />)
  .add('With custom placeholder', () => <SearchBar placeholder='Search Jobs'/>)
  .add('With custom start value', () => <SearchBar value='Search term'/>)
  .add('Disabled', () => <SearchBar disabled/>)
  .add('With onChange', () => {

    const [state, setState] = useState('');
    return (
      <>
        <h4>Query value</h4>
        <p>{state}</p>
        <SearchBar onChange={query => setState(query)}/>
      </>
    )
  });