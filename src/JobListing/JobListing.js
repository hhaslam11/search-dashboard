import React from 'react';

import './JobListing.scss';

/**
 * Add spaces to a number to a currency-friendly format.
 * Example: 123456 --> 123 456
 * @param {string} currency unformatted string or integer.
 */
const parseCurrency = currency => currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

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
        <a href={props.companyUrl} target="_blank" rel="noopener noreferrer">
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
  return (
    <div className="job-listing">
      <div className="job-title">
        <div>{props.jobName}</div>
        {company}
        <div className="job-info">
          <div className="job-location">
            {props.city && `${props.city}, `}{props.country}
          </div>
          <div className="job-salary">
            ${parseCurrency(props.salaryMin)} - ${parseCurrency(props.salaryMax)}
          </div>
        </div>
      </div>
      <div className="job-description">
        {props.jobDesc + ' '}
        <a href={props.url} target="_blank" rel="noopener noreferrer" alt="Apply now">read more</a>
      </div>
      <div className="job-footer">
        <div className="job-posted-date">
          Posted {props.posted}
        </div>
        <a href={props.url} target="_blank" rel="noopener noreferrer" alt="Apply now" className="job-apply">Apply Now</a>
      </div>
    </div>
  )
}