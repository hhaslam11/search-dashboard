import React, { useState, useEffect } from 'react';
import axios from 'axios';

import JobListing from './JobListing/JobListing';
import SearchBar from './SearchBar/SearchBar';
import parseApiData from './helpers/parseApiData';
import Loading from './Loading/Loading';
import RadiusFilter from './RadiusFilter/RadiusFilter';
import DaysPostedFilter from './DaysPostedFilter/DaysPostedFilter';
import useDebounce from './hooks/useDebounce';

import './App.scss';

const API_KEY = process.env.REACT_APP_API_KEY;
const JOBS_PER_PAGE = 30;

// state
const LOADING = 'loading';
const EMPTY = 'empty';
const NO_RESULTS = 'no results';

// define how many days map to each value for DaysPostedFilter
const daysPostedMap = {
  1: '',
  2: 1,
  3: 7,
  4: 30
};

// map values to miles for Radius Filter
const rangeMap = {
  1: 10,
  2: 50,
  3: 100,
  4: 500,
  5: ''
}

function App() {
  const [state, setState] = useState(EMPTY);
  const [daysPosted, setDaysPosted] = useState(1);
  const [range, setRange] = useState(5);
  const rangeDebounced = useDebounce(range, 500);

  const [query, setQuery] = useState({
    job: '',
    location: ''
  });

  // run this every time the search query is updated.
  // it will call the api and render the results
  useEffect(() => {
    if (!query.job && !query.location) {
      setState(EMPTY);
      return;
    }
    setState(LOADING);

    axios.get(`https://api.ziprecruiter.com/jobs/v1?search=${query.job}&location=${query.location},%20CA&radius_miles=${rangeMap[rangeDebounced]}&days_ago=${daysPostedMap[daysPosted]}&jobs_per_page=${JOBS_PER_PAGE}&page=1&api_key=${API_KEY}`)
      .then(res => {
        if (res.data.jobs.length === 0) {
          setState(NO_RESULTS);
          return;
        }

        const listings = res.data.jobs.map(el => {
          let job = parseApiData(el);
          return (
            <JobListing
              city={job.city}
              country={job.country}
              url={job.url}
              companyName={job.companyName}
              jobName={job.jobName}
              jobDesc={job.jobDesc}
              posted={job.posted}
              salaryMax={job.salaryMax}
              salaryMin={job.salaryMin}
            />
          )
        });
        setState(listings);
      });
  }, [query, daysPosted, rangeDebounced]);

  return (
    <div className="main">
      <div className="search">

        <div className="col">
          <SearchBar
            placeholder='Search Jobs'
            timeout={750}
            onChange={(searchQuery) => setQuery(prev => ({ ...prev, job: searchQuery }))}
          />
          <DaysPostedFilter onChange={val => setDaysPosted(val)} />
        </div>

        <div className="col">
          <SearchBar
            placeholder='Search Location'
            timeout={750}
            onChange={(searchQuery) => setQuery(prev => ({ ...prev, location: searchQuery }))}
          />
          <div className="range">
            <RadiusFilter onChange={val => setRange(val)} />
            <div className="range-text">range: {rangeMap[range]  || 'unlimited'} miles</div>
          </div>
        </div>

      </div>
      <div>
      <div className="results">
        {state === LOADING && <Loading/>}
        {state === NO_RESULTS && <h4>No results found</h4>}
        {state !== LOADING && state !== EMPTY && state !== NO_RESULTS ? state : null}
      </div>
      </div>
    </div>
  );
}

export default App;
