import { create } from 'apisauce';

const apiClient = create({
    baseUrl: process.env.suggestion_back ? `http://${process.env.suggestion_back}:${process.env.suggestion_back}` : 'http://172.20.3.200:4000'
});

export default apiClient;