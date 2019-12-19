import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '../Header/Header';

storiesOf('Header', module)
  .add('basic', () => <Header/>);