import React from 'react';
import { storiesOf } from '@storybook/react';

import Loading from '../Loading/Loading';

storiesOf('Loading', module)
  .add('Basic', () => <Loading/>);