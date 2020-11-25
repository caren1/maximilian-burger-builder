import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-34d82.firebaseio.com/'
});

export default instance;