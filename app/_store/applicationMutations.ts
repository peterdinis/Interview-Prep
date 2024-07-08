import axios from 'axios';

export const deleteInterview = async (id: string) => {
    const response = await axios.delete(`/api/interview/${id}`);
    return response.data;
};
