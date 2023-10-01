import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to the login page if the token is not present
      window.location.href = '/login';
    }
  }, []);

  return <>{children}</>;
}

export default ProtectedRoute;
