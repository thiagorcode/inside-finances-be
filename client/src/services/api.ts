import axios from 'axios';

// * URL da API
export default axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-type': 'application/json',
  },
});
