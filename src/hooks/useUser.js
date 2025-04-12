import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getAuthHeaders } from '../utils/api';

export const useUser = () => {
    const getCurrentUser = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        
        try {
            const decoded = jwtDecode(token);
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/verificar`,getAuthHeaders());
            return {
                id: decoded.sub,
                email: decoded.email
            };
        } catch (error) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return null;
        }
    };

    return { getCurrentUser };
};