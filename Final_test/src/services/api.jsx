import axios from 'axios';

const API_URL = 'https://teachingk18.github.io/WF_Test_ver2/data.json';

export const fetchMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}
