import React, { useEffect, useState } from 'react';
import { User } from 'oidc-client-ts';
import { getUser, login } from '../lib/keycloak';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Kiểm tra query parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('code') || urlParams.get('state')) {
          console.log('Callback params detected, skipping login');
          setIsAuthenticated(false);
          setIsChecking(false);
          return;
        }

        console.log('Checking user status');
        const user: User | null = await getUser();
        if (user) {
          console.log('User found:', user.profile);
          setIsAuthenticated(true);
        } else {
          console.log('No user found, initiating login');
          setIsAuthenticated(false);
          login();
        }
      } catch (err) {
        console.error('Error checking user:', err);
        setIsAuthenticated(false);
        login();
      } finally {
        setIsChecking(false);
      }
    };
    checkUser();
  }, []);

  if (isChecking || isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;