import React from 'react';
import { render } from '@testing-library/react';

import Loading from './Loading';

test('render without crashing', () => {
  render(<Loading/>);
});