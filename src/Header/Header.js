import React from 'react';

import './Header.scss';

/**
 * A mock/placeholder header. Not really meant to do much
 */
export default () => {
  return (
    <div className="header">
      <div className="title">
        <h3>JobSearch App</h3>
        <div className="attribution">
          <h5 className="center">Powered by </h5>
          <a href="https://www.ziprecruiter.com/jobs" id="jobs_widget_link"><span id="zr_logo_container"><img className="center" id="zr_logo" src="https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png" alt="ZipRecruiter" width="120" /></span></a>
        </div>
      </div>
    </div>
  );
};