import axios from 'axios';

export default axios.create({
    baseURL: 'https://comix-server.vercel.app/',
    headers: {
        'Content-type': 'application/json',
    },
});
