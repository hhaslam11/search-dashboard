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
 * @param {string} props.country Country of the job posting
 * @param {string} props.companyName Name of company
 * @param {string} props.companyDesc Description of company
 * @param {string} props.companyUrl Company website
 * @param {string} props.jobName Name of job. example "Senior ruby on rails developer"
 * @param {string} props.jobDesc Description of job
 * @param {string} props.posted Date posted (user friendly format)
 * @param {string} props.salaryMax Max salary
 * @param {string} props.salaryMin Min salary
 * @param {string} props.salarySource Source of salary information
 */
export default function JobListing(props) {


  return (
    <div className="job-listing">
      <div className="job-title">
        <div>{props.jobName}</div>
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
        {props.jobDesc}
      </div>
      <div className="job-footer">
        <div className="job-posted-date">
          Posted {props.posted}
        </div>
        <a href="#" className="job-apply">Apply Now</a>
      </div>
    </div>
  )
}