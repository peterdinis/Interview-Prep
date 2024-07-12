import axios from 'axios';

export const fetchInterview = async (id: string) => {
    const response = await axios.get(`/api/interview/${id}`);
    return response.data;
};

export const fetchInterviews = async () => {
    const response = await axios.get('/api/interviews');
    return response.data;
};
