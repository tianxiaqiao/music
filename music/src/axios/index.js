import Axios from 'axios'

Axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log('拦截器')
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default Axios