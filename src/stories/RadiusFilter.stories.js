import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import RadiusFilter from '../RadiusFilter/RadiusFilter';

storiesOf('Radius filter', module)
  .add('with no onChange (should be empty)', () => <RadiusFilter/>)
  .add('with onChange function', () => {
    const [state, setState] = useState(1);
    return (
      <>
        <h4>{state}</h4>
        <RadiusFilter
          onChange={val => setState(val)}
        />
      </>
    )
  });