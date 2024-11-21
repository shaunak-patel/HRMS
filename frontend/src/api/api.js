import axios from 'axios';

export const fetchMessage = async () => {
    const response = await axios.get('http://localhost:5000/'); // Adjust the URL as needed
    return response.data;
};