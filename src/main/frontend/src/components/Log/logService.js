import axios from 'axios';

const BASE_URL = '/admin/logs'; // API 엔드포인트

export const getUserLogs = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`); // userId에 해당하는 로그 가져오기
        return response.data;
    } catch (error) {
        console.error('Error fetching user logs:', error);
        throw error;
    }
};
