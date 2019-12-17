/**
 * Parse job object from zipSearch api
 * @param {object} apiData job object from zipSearch api
 * @return {object} parsed object
 * {
 *  city
 *  url
 *  country
 *  companyName
 *  companyUrl
 *  jobName
 *  jobDesc
 *  posted
 *  salaryMax
 *  salaryMin
 * }
 */
export default apiData => {
  if (typeof apiData !== 'object') return null;

  return {
    city: apiData.city ? apiData.city : null,
    url: apiData.url ? apiData.url : null,
    country: apiData.country ? apiData.country : null,
    companyName: apiData.hiring_company && apiData.hiring_company.name ? apiData.hiring_company.name : null,
    companyUrl: apiData.hiring_company && apiData.hiring_company.url ? apiData.hiring_company.url : null,
    jobName: apiData.name ? apiData.name : null,
    jobDesc: apiData.snippet ? apiData.snippet : null,
    posted: apiData.posted_time_friendly ? apiData.posted_time_friendly : null,
    salaryMax: apiData.salary_max_annual ? apiData.salary_max_annual : null,
    salaryMin: apiData.salary_min_annual ? apiData.salary_min_annual : null
  };
}