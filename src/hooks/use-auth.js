import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const { email, id, userName } = useSelector((state) => state.user);

  // обновление токена при изменении его значения в localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return {
    isAuth: !!token,
    token,
    email,
    id,
    userName,
  };
};

export default useAuth;
