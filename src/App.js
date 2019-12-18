import React, { useState, useEffect } from 'react';
import axios from 'axios';

import JobListing from './JobListing/JobListing';
import SearchBar from './SearchBar/SearchBar';
import parseApiData from './helpers/parseApiData';
import Loading from './Loading/Loading';

import './App.scss';

const API_KEY = process.env.REACT_APP_API_KEY;

// state
const LOADING = 'loading';
const EMPTY = 'empty';
const NO_RESULTS = 'no results';

function App() {
  const [state, setState] = useState(EMPTY);
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

    axios.get(`https://api.ziprecruiter.com/jobs/v1?search=${query.job}&location=${query.location},%20CA&radius_miles=25&days_ago=&jobs_per_page=10&page=1&api_key=${API_KEY}`)
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
  }, [query]);

  return (
    <div className="main">
      <div className="search">
        <SearchBar
          placeholder='job'
          timeout={750}
          onChange={(searchQuery) => {
            setState(LOADING);
            setQuery(prev => ({ ...prev, job: searchQuery }));
          }}
        />
        <SearchBar
          placeholder='location'
          timeout={750}
          onChange={(searchQuery) => {
            setState(LOADING);
            setQuery(prev => ({ ...prev, location: searchQuery }));
          }}
        />
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
