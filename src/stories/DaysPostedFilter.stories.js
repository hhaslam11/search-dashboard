import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import DaysPostedFilter from '../DaysPostedFilter/DaysPostedFilter';

storiesOf('Days Posted filter', module)
  .add('with no onChange (should be empty)', () => <DaysPostedFilter/>)
  .add('with onChange function', () => {
    const [state, setState] = useState(1);
    return (
      <>
        <h4>{state}</h4>
        <DaysPostedFilter
          onChange={val => setState(val)}
        />
      </>
    )
  });