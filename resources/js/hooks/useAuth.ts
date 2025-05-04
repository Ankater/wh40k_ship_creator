import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { login as loginAction } from "../store/slices/authSlice";

/**
 * Хук для получения параметров по авторизации
 */
export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (username: string, password: string) => {
        try {
            await dispatch(loginAction({ username, password })).unwrap();
            return true;
        } catch (err) {
            console.error("Ошибка входа:", err);
            return false;
        }
    };

    return { handleLogin };
};
