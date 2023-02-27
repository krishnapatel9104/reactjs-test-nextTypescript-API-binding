const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

let baseURL = "http://localhost:3002/api"
if (!development)
  baseURL = "http://localhost:3002/api"


export default baseURL;