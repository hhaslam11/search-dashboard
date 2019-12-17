import React from 'react';
import { render, cleanup } from '@testing-library/react';

import JobListing from './JobListing';

afterEach(cleanup);

const city = 'Vancouver';
const url = 'https://www.example.org/';
const country = 'CA';
const companyName = 'A Good Company';
const companyUrl= 'https://www.example.com';
const jobName = 'Javascript Developer';
const jobDesc = 'a generic job description.';
const posted = '2 Days ago';
const salaryMax = 80000;
const salaryMin = 100000;

test('renders without crashing', () => {
  render(<JobListing />);
});

test('should skip render if right information isnt passed', () => {
  expect(JobListing({})).toEqual(null);
});

test('should render with all info passed', () => {
  const { queryByText, queryByTestId } = render(
    <JobListing
      city={city}
      url={url}
      country={country}
      companyName={companyName}
      companyUrl={companyUrl}
      jobName={jobName}
      jobDesc={jobDesc}
      posted={posted}
      salaryMax={salaryMax}
      salaryMin={salaryMin}
    />
  );
  expect(queryByText(city, { exact: false })).not.toBeNull();
  expect(queryByText(country, { exact: false })).not.toBeNull();
  expect(queryByText(companyName)).not.toBeNull();
  expect(queryByTestId('company-link')).not.toBeNull();
  expect(queryByText(jobName)).not.toBeNull();
  expect(queryByText(jobDesc)).not.toBeNull();
  expect(queryByText(posted, { exact: false })).not.toBeNull();
});

test('should not link to company if no url is avaliable', () => {
  const { queryByTestId } = render(
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
  );

  expect(queryByTestId('company-link')).toBeNull();
});

test('should link to company if link is avaliable', () => {
  const { queryByTestId } = render(
    <JobListing
      city={city}
      url={url}
      country={country}
      companyName={companyName}
      companyUrl={companyUrl}
      jobName={jobName}
      jobDesc={jobDesc}
      posted={posted}
      salaryMax={salaryMax}
      salaryMin={salaryMin}
    />
  );
  expect(queryByTestId('company-link')).not.toBeNull();
});

test('should display properly if city isnt avaliable', () => {
  const { queryByText, queryByTestId } = render(
    <JobListing
      url={url}
      country={country}
      companyName={companyName}
      companyUrl={companyUrl}
      jobName={jobName}
      jobDesc={jobDesc}
      posted={posted}
      salaryMax={salaryMax}
      salaryMin={salaryMin}
    />
  );
  expect(queryByText(city, { exact: false })).toBeNull();
  expect(queryByText(country, { exact: false })).not.toBeNull();
  expect(queryByText(companyName)).not.toBeNull();
  expect(queryByTestId('company-link')).not.toBeNull();
  expect(queryByText(jobName)).not.toBeNull();
  expect(queryByText(jobDesc)).not.toBeNull();
  expect(queryByText(posted, { exact: false })).not.toBeNull();
});

test('should display properly if country isnt avaliable', () => {
  const { queryByText, queryByTestId } = render(
    <JobListing
      city={city}
      url={url}
      companyName={companyName}
      companyUrl={companyUrl}
      jobName={jobName}
      jobDesc={jobDesc}
      posted={posted}
      salaryMax={salaryMax}
      salaryMin={salaryMin}
    />
  );
  expect(queryByText(city, { exact: false })).not.toBeNull();
  expect(queryByText(country, { exact: false })).toBeNull();
  expect(queryByText(companyName)).not.toBeNull();
  expect(queryByTestId('company-link')).not.toBeNull();
  expect(queryByText(jobName)).not.toBeNull();
  expect(queryByText(jobDesc)).not.toBeNull();
  expect(queryByText(posted, { exact: false })).not.toBeNull();
});

test('should display properly if country or city isnt avaliable', () => {
  const { queryByText, queryByTestId } = render(
    <JobListing
      url={url}
      companyName={companyName}
      companyUrl={companyUrl}
      jobName={jobName}
      jobDesc={jobDesc}
      posted={posted}
      salaryMax={salaryMax}
      salaryMin={salaryMin}
    />
  );
  expect(queryByText(city, { exact: false })).toBeNull();
  expect(queryByText(country, { exact: false })).toBeNull();
  expect(queryByText(companyName)).not.toBeNull();
  expect(queryByTestId('company-link')).not.toBeNull();
  expect(queryByText(jobName)).not.toBeNull();
  expect(queryByText(jobDesc)).not.toBeNull();
  expect(queryByText(posted, { exact: false })).not.toBeNull();
});

test('should only display one number if min and max salary are the same', () => {
  const { queryByText, queryByTestId } = render(
    <JobListing
      city={city}
      url={url}
      country={country}
      companyName={companyName}
      companyUrl={companyUrl}
      jobName={jobName}
      jobDesc={jobDesc}
      posted={posted}
      salaryMax={100000}
      salaryMin={100000}
    />
  );
  expect(queryByText(city, { exact: false })).not.toBeNull();
  expect(queryByText(country, { exact: false })).not.toBeNull();
  expect(queryByText(companyName)).not.toBeNull();
  expect(queryByTestId('company-link')).not.toBeNull();
  expect(queryByText(jobName)).not.toBeNull();
  expect(queryByText(jobDesc)).not.toBeNull();
  expect(queryByText('$100 000')).not.toBeNull();
  expect(queryByText(posted, { exact: false })).not.toBeNull();
});

test('should display salary range if min and max are different', () => {
  const { queryByText, queryByTestId } = render(
    <JobListing
      city={city}
      url={url}
      country={country}
      companyName={companyName}
      companyUrl={companyUrl}
      jobName={jobName}
      jobDesc={jobDesc}
      posted={posted}
      salaryMax={120000}
      salaryMin={100000}
    />
  );
  expect(queryByText(city, { exact: false })).not.toBeNull();
  expect(queryByText(country, { exact: false })).not.toBeNull();
  expect(queryByText(companyName)).not.toBeNull();
  expect(queryByTestId('company-link')).not.toBeNull();
  expect(queryByText(jobName)).not.toBeNull();
  expect(queryByText(jobDesc)).not.toBeNull();
  expect(queryByText('$100 000 - $120 000')).not.toBeNull();
  expect(queryByText(posted, { exact: false })).not.toBeNull();
});

test('should not display salary if not avaliable', () => {
  const { queryByText, queryByTestId } = render(
    <JobListing
      city={city}
      url={url}
      country={country}
      companyName={companyName}
      companyUrl={companyUrl}
      jobName={jobName}
      jobDesc={jobDesc}
      posted={posted}
    />
  );
  expect(queryByText(city, { exact: false })).not.toBeNull();
  expect(queryByText(country, { exact: false })).not.toBeNull();
  expect(queryByText(companyName)).not.toBeNull();
  expect(queryByTestId('company-link')).not.toBeNull();
  expect(queryByText(jobName)).not.toBeNull();
  expect(queryByText(jobDesc)).not.toBeNull();
  expect(queryByText('$', { exact: false })).toBeNull();
  expect(queryByText(posted, { exact: false })).not.toBeNull();
});