import React from 'react';

import './Loading.scss';

/**
 * Css loading animation
 * @see https://loading.io/css/
 */
export default function Loading() {
  return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
}