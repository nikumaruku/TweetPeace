import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return <>{children}</>;
}

export default ProtectedRoute;
