import React from 'react';
import { storiesOf } from '@storybook/react';

import Pagination from '../Pagination/Pagination';

storiesOf('Pagination', module)
  .add('basic', () => <Pagination/>);