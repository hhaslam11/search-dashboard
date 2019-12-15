import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBar from '../SearchBar/SearchBar';

storiesOf('Search Bar', module)
  .add('Basic', () => <SearchBar />)
  .add('With custom placeholder', () => <SearchBar placeholder='Search Jobs'/>)
  .add('Disabled', () => <SearchBar disabled/>);