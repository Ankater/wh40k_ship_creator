import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { login as loginAction } from '@/store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (email: string, password: string) => {
        try {
            await dispatch(loginAction({ email, password })).unwrap();
            return true;
        } catch (err) {
            console.error('Ошибка входа:', err);
            return false;
        }
    };

    return { handleLogin };
};
