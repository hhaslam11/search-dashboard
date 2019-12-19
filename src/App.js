import React, { useState, useEffect } from 'react';
import axios from 'axios';

import JobListing from './JobListing/JobListing';
import SearchBar from './SearchBar/SearchBar';
import parseApiData from './helpers/parseApiData';
import Loading from './Loading/Loading';
import DaysPostedFilter from './DaysPostedFilter/DaysPostedFilter';

import './App.scss';
import RadiusFilter from './RadiusFilter/RadiusFilter';

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

    axios.get(`https://api.ziprecruiter.com/jobs/v1?search=${query.job}&location=${query.location},%20CA&radius_miles=${rangeMap[range]}&days_ago=${daysPostedMap[daysPosted]}&jobs_per_page=${JOBS_PER_PAGE}&page=1&api_key=${API_KEY}`)
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
  }, [query, daysPosted, range]);

  return (
    <div className="main">
      <div className="search">
        <SearchBar
          placeholder='Search Jobs'
          timeout={750}
          onChange={(searchQuery) => {
            setState(LOADING);
            setQuery(prev => ({ ...prev, job: searchQuery }));
          }}
        />
        <SearchBar
          placeholder='Search Location'
          timeout={750}
          onChange={(searchQuery) => {
            setState(LOADING);
            setQuery(prev => ({ ...prev, location: searchQuery }));
          }}
        />
        <DaysPostedFilter
          onChange={val => {
            setState(LOADING);
            setDaysPosted(val);
          }}
        />
        <RadiusFilter
          onChange={val => {
            setState(LOADING);
            setRange(val);
          }}
        />
        <h3>range: {rangeMap[range]  || 'unlimited'} miles</h3>
      </div>
      <div>
      <div className="results">
        {state === LOADING && <Loading/>}
        {state === NO_RESULTS && <h4>no results found</h4>}
        {state !== LOADING && state !== EMPTY && state !== NO_RESULTS ? state : null}
      </div>
      </div>
    </div>
  );
}

export default App;
