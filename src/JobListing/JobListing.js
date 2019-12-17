import React from 'react';

import parseCurrency from '../helpers/parseCurrency';
import './JobListing.scss';
/**
 * Display a job listing card.
 * @param {string} props.city City of the job posting
 * @param {string} props.url Job listing/apply url <required>
 * @param {string} props.country Country of the job posting
 * @param {string} props.companyName Name of company <required>
 * @param {string} props.companyUrl Company website
 * @param {string} props.jobName Name of job. example "Senior ruby on rails developer" <required>
 * @param {string} props.jobDesc Description of job <required>
 * @param {string} props.posted Date posted (user friendly format) <required>
 * @param {string} props.salaryMax Max salary
 * @param {string} props.salaryMin Min salary
 */
export default function JobListing(props) {

  // Check that the required information is given, or else skip rendering
  if (
    !props.url ||
    !props.companyName ||
    !props.jobName ||
    !props.jobDesc ||
    !props.posted) {
      console.log('warning: canceling render of job listing because the required information isnt avaliable.');
      return null;
    }

  // Add link to company website if avaliable
  let company;
  if (props.companyUrl) {
    company = (
      <div className="job-company">
        <a href={props.companyUrl} data-testid="company-link" target="_blank" rel="noopener noreferrer">
          {props.companyName}
        </a>
      </div>
    )
  } else {
    company = (
      <div className="job-company">
        {props.companyName}
      </div>
    );
  }

  //Get currency formatting
  let currency;
  if (!props.salaryMin && !props.salaryMax) {
    currency = null;
  } else if (props.salaryMin === props.salaryMax) {
    currency = '$' + parseCurrency(props.salaryMin);
  } else if (props.salaryMin && !props.salaryMax) {
    currency = '$' + parseCurrency(props.salaryMin);
  } else if (!props.salaryMin && props.salaryMax) {
    currency = '$' + parseCurrency(props.salaryMax);
  } else {
    currency = `$${currency = parseCurrency(props.salaryMin)} - $${currency = parseCurrency(props.salaryMax)}`;
  }

  //Get location formatting
  let location;
  if (props.country && props.city) {
    location = `${props.city}, ${props.country}`;
  } else if (!props.country && !props.city) {
    location = null;
  } else {
    location = `${props.country ? props.country : ''}${props.city ? props.city : ''}`;
  }

  return (
    <div className="job-listing">
      <div className="job-title">
        <div>{props.jobName}</div>
        {company}
        <div className="job-info">
          <div className="job-location">
            {location}
          </div>
          <div className="job-salary">
            {currency}
          </div>
        </div>
      </div>
      <div className="job-description">
        <span dangerouslySetInnerHTML={{__html: props.jobDesc}}></span> {/* TODO this isnt safe. */}
        {' '}
        <a href={props.url} target="_blank" rel="noopener noreferrer">read more</a>
      </div>
      <div className="job-footer">
        <div className="job-posted-date">
          Posted {props.posted}
        </div>
        <a href={props.url} target="_blank" rel="noopener noreferrer" className="job-apply">Apply Now</a>
      </div>
    </div>
  )
}