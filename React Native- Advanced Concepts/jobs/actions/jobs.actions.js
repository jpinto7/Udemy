import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import * as types from './types';

const JOBS_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const API_URL = 'http://api.indeed.com/ads/apisearch?';

const buildJobsUrl = zip => {
  const query = qs.stringify({ ...JOBS_QUERY_PARAMS, l: zip });
  return `${API_URL}${query}`;
}

export const fetchJobs = (region, callback) => (
  async dispatch => {
    try {
      const zip = await reverseGeocode(region);
      const url = buildJobsUrl(zip);
      const { data } = await axios.get(url);
      dispatch({
        type: types.FETCH_JOBS,
        payload: data
      });
      callback();
    } catch (e) {
      console.log(e);
    }
  }
);

export const likeJob = job => ({
  type: types.LIKE_JOB,
  payload: job
});

export const clearLikedJobs = () => ({
  type: types.CLEAR_LIKED_JOBS,
});
