import axios from 'axios';

// * URL da API
export default axios.create({
  baseURL: 'http://localhost:3001/api/transaction',
  headers: {
    'Content-type': 'application/json',
  },
});
