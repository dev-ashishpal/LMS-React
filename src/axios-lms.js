import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'https://western-storm-311716-default-rtdb.firebaseio.com/',
});

export default axiosInstance;