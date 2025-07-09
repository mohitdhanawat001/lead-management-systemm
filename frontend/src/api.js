// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  // Don't add extra headers here — browser will handle preflight if needed
});

export default API;
