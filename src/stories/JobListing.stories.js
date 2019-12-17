import React from 'react';
import { storiesOf } from '@storybook/react';

import JobListing from '../JobListing/JobListing';

//Real data taken from api (location modified)
const jobInfo = JSON.parse(`{"total_jobs":142,"success":true,"num_paginable_jobs":91,"jobs":[{"salary_min_annual":84272,"snippet":"Must have advanced skills developing with JavaScript on the server-side. * Working knowledge of the latest features in ECMAScript (ES), and can describe things like prototypal inheritance, de...","category":"","salary_max_annual":127156,"has_zipapply":false,"hiring_company":{"name":"Strategic Staffing Solutions","url":null,"id":null,"description":null},"posted_time":"2019-12-12T02:00:00","salary_max":127156,"location":"CA","country":"CA","posted_time_friendly":"4 days ago","salary_interval":"yearly","salary_min":84272,"source":"LinkedIn","salary_source":"predicted","city":"Vancouver","last_plan_name":null,"name":"Javascript Developer (Backend)","buyer_type":"job_board","state":"","job_age":4,"has_non_zr_url":"1","url":"https://www.ziprecruiter.com/eclk/DmCPNqPVWJSlB5vafIhQyxwGBYsXXy8kKId2N-nNz4EgHpPsO7ETLWCsSpkX_w6HXIRDiqbmYuqiy7WpUDs0eWi6Xre0niwt2xX-P3RpKCnREcFAUzdMlY92Y7iCqBCgQRnlJtcxkRVfbIqfWqWtzWiObboXvby2svNdKjTo5UO1Nd7F74U0WQosUB7rhqwKjgTZ2l1h1I7IILSXbVJoQHtPS6LwvQuPcHglkmhA-U9UufNSTwzXR8of7LeEh95tla-TLeGp80RtuglhvjYV4WIq5a_OY1dELvVLMDDUTkyfmnsnea7zWeu42djtUtzpzYH2w_n5KeFzFaZ3DbT7qjR_osDf9CtHk5wIvTdAkzkSzHVwaA-Xxm-kxpUrfECANhGbyxwsxRG70K0drLnGapeMS03x29Aaup4UV3pVXqaYgklBLq4IaLc8aCH5cdLNVh7ijRcMeGA-EQ4WWO6eEMbTkARmqbEOmTI9bNOoXpiDQGPwCY8Sp_LJbwQhYxghlAC6PSUv6T34YHX4wMvBXU_R0J2IVdWVLUhlYY9GCogRHuLjIolGTZXMbYjmRN3ixs2E8zjEKkCbkS-QmCCIetGXoGXbDmVbLsZR6XTfoPQxYg-VmAIfKF_w95mEQa93NO7mmVYC0qj6dWFo0JeqKXZREq_jGDFSdmIJQc8ulZ4.7cade240603425e24469294e5f130dd7","id":"linkedin_active_cpc2a583102-1644925528","industry_name":"Technology"}]}`).jobs[0];

// Parse data
const city         = jobInfo.city;
const url          = jobInfo.url;   
const country      = jobInfo.country;
const companyName  = jobInfo.hiring_company.name;
const jobName      = jobInfo.name;
const jobDesc      = jobInfo.snippet;
const posted       = jobInfo.posted_time_friendly;
const salaryMax    = jobInfo.salary_max_annual;
const salaryMin    = jobInfo.salary_min_annual;

storiesOf('Job Listing', module)
  .add('With no info (should not render)', () => <JobListing />)
  .add('With full info', () => {
    return (
      <JobListing
        city={city}
        url={url}
        country={country}
        companyName={companyName}
        companyUrl="https://example.com"
        jobName={jobName}
        jobDesc={jobDesc}
        posted={posted}
        salaryMax={salaryMax}
        salaryMin={salaryMin}
      /> 
    )
  })
  .add('With minimum info', () => {
    return (
      <JobListing
        url={url}
        companyName={companyName}
        jobName={jobName}
        jobDesc={jobDesc}
        posted={posted}
      /> 
    )
  })
  .add('With no company link', () => {
    return (
      <JobListing
        city={city}
        url={url}
        country={country}
        companyName={companyName}
        jobName={jobName}
        jobDesc={jobDesc}
        posted={posted}
        salaryMax={salaryMax}
        salaryMin={salaryMin}
      /> 
    )
  })
  .add('With same min and max salary', () => {
    return (
      <JobListing
        city={city}
        url={url}
        country={country}
        companyName={companyName}
        companyUrl="https://example.com"
        jobName={jobName}
        jobDesc={jobDesc}
        posted={posted}
        salaryMax={salaryMax}
        salaryMin={salaryMax}
      /> 
    )
  })
  .add('With no salary', () => {
    return (
      <JobListing
        city={city}
        url={url}
        country={country}
        companyName={companyName}
        companyUrl="https://example.com"
        jobName={jobName}
        jobDesc={jobDesc}
        posted={posted}
      /> 
    )
  })
  .add('With no location info', () => {
    return (
      <JobListing
        url={url}
        companyName={companyName}
        companyUrl="https://example.com"
        jobName={jobName}
        jobDesc={jobDesc}
        posted={posted}
        salaryMax={salaryMax}
        salaryMin={salaryMin}
      /> 
    )
  })
  .add('With no country', () => {
    return (
      <JobListing
        city={city}
        url={url}
        companyName={companyName}
        companyUrl="https://example.com"
        jobName={jobName}
        jobDesc={jobDesc}
        posted={posted}
        salaryMax={salaryMax}
        salaryMin={salaryMin}
      /> 
    )
  })
  .add('With no city', () => {
    return (
      <JobListing
        url={url}
        country={country}
        companyName={companyName}
        companyUrl="https://example.com"
        jobName={jobName}
        jobDesc={jobDesc}
        posted={posted}
        salaryMax={salaryMax}
        salaryMin={salaryMin}
      /> 
    )
  });