import React from 'react';
import { storiesOf } from '@storybook/react';

import DaysPostedFilter from '../DaysPostedFilter/DaysPostedFilter';

storiesOf('Days Posted filter', module)
  .add('default', () => <DaysPostedFilter/>);